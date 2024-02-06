//! TCP fingerprinting by looking at default values
//!
//! See https://en.wikipedia.org/wiki/TCP/IP_stack_fingerprinting

use std::cmp::min;
use std::fmt::{Display, Formatter};
use std::net::{IpAddr, SocketAddr};
use std::time::Duration;

use etherparse::{
    IpHeader, Ipv4Extensions, Ipv4Header, Ipv6Extensions, Ipv6Header, PacketBuilder,
    TcpOptionElement,
};
use log::trace;
use socket2::{Domain, Protocol};

use crate::modules::os_detection::errors::{RawTcpError, TcpFingerprintError};
use crate::modules::os_detection::syn_scan::tcp_get_syn_ack;
use crate::utils::{allocate_tcp_port, find_source_ip, raw_socket};

/// Contains the information for a TCP fingerprint as generated by `fingerprint_tcp`.
#[derive(Debug)]
pub struct TcpFingerprint {
    /// True if this fingerprint is an IPv4 fingerprint, otherwise this is an IPv6 fingerprint.
    pub is_ipv4: bool,
    /// - IPv4: true if the IP response header contained a non-zero identification field
    /// - IPv6: always false right now
    pub has_identification: bool,
    /// true if the TCP header contained at least one timestamp options field.
    pub has_timestamp: bool,
    /// The value of the payload length IP header field.
    pub payload_len: u8,
    /// IPv4: the time-to-live header field of the IP header
    /// IPv6: the hop limit header field of the IP header
    pub ttl: u8,
    /// The TCP data offset header field value.
    pub data_offset: u8,
    /// The TCP window size header field value.
    pub window_size: u16,
    /// The last TCP window scale header field value.
    pub window_scale: u8,
    /// The last TCP maximum segment size header field value.
    pub mss: u16,
    /// A list of all specified TCP option types in order how they appeared.
    pub options: [u8; 16],
}

impl Display for TcpFingerprint {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let flags1: u8 = if self.is_ipv4 { 0b1000 } else { 0 };
        let flags2: u8 = if self.has_identification { 0b0001 } else { 0 }
            | if self.has_timestamp { 0b0010 } else { 0 };
        let mut compressed_options: u64 = 0;
        for (i, option) in self.options.iter().enumerate() {
            compressed_options |= (*option as u64) << (i * 4);
        }

        write!(f, "{:x}:", flags1)?;
        write!(f, "{:x}:", flags2)?;
        write!(f, "{:x}:", self.payload_len)?;
        write!(f, "{:x}:", self.ttl)?;
        write!(f, "{:x}:", self.data_offset)?;
        write!(f, "{:x}:", self.window_size)?;
        write!(f, "{:x}:", self.window_scale)?;
        write!(f, "{:x}:", self.mss)?;
        write!(f, "{:x}", compressed_options)
    }
}

/// Generates a TCP fingerprint based on the implementation-defined different TCP header values.
///
/// # Arguments
///
/// * `address` - an IP + TCP port combination that is accepting connections
pub async fn fingerprint_tcp(
    address: SocketAddr,
    timeout: Duration,
) -> Result<TcpFingerprint, TcpFingerprintError> {
    Ok(tokio::time::timeout(timeout, fingerprint_tcp_impl(address)).await??)
}

async fn fingerprint_tcp_impl(address: SocketAddr) -> Result<TcpFingerprint, RawTcpError> {
    let socket = raw_socket(Domain::for_address(address), Protocol::TCP)?;

    let source_ip = find_source_ip(address.ip())?;

    let port = allocate_tcp_port(address)?;

    trace!(
        "Sending TCP SYN from {source_ip:?}:{} to {address:?}",
        port.port()
    );

    let syn = PacketBuilder::ip(match (address, source_ip) {
        (SocketAddr::V4(addr), IpAddr::V4(local_addr)) => {
            let mut ip = Ipv4Header::new(0, 42, 6, local_addr.octets(), addr.ip().octets());
            ip.identification = rand::random();

            IpHeader::Version4(ip, Ipv4Extensions { auth: None })
        }
        (SocketAddr::V6(addr), IpAddr::V6(local_addr)) => IpHeader::Version6(
            Ipv6Header {
                traffic_class: 0, // TODO: sane values?
                source: local_addr.octets(),
                destination: addr.ip().octets(),
                flow_label: 0,     // TODO: sane values?
                hop_limit: 0,      // TODO: sane values?
                next_header: 0,    // TODO: sane values?
                payload_length: 0, // filled in by OS
            },
            Ipv6Extensions {
                auth: None,
                destination_options: None,
                fragment: None,
                hop_by_hop_options: None,
                routing: None,
            },
        ),
        (_, _) => return Err(RawTcpError::InvalidLocalAddrDomain),
    })
    .tcp(port.port(), address.port(), 0x31337421, 31337)
    .syn()
    .options(&[
        TcpOptionElement::MaximumSegmentSize(1337),
        TcpOptionElement::SelectiveAcknowledgementPermitted,
        TcpOptionElement::Timestamp(0xf0031337, 0), // timestamp is an opaque value that will just be echo'd
        TcpOptionElement::Noop,
        TcpOptionElement::WindowScale(7),
    ])
    .expect("the TCP options above should never reach 40 bytes!");

    let len = syn.size(0);
    let mut result = Vec::<u8>::with_capacity(len);
    syn.write(&mut result, &[])
        .expect("IP/TCP syn build failed?!");
    let (ip, tcp) = tcp_get_syn_ack(socket, address, port.port(), &result).await?;

    let mut window_scale = 0;
    let mut mss = 0;
    let mut options = [0u8; 16];
    let mut has_timestamp = false;
    for (i, option) in tcp.options_iterator().enumerate() {
        if i >= options.len() {
            break;
        }
        match option? {
            TcpOptionElement::Noop => options[i] = 1,
            TcpOptionElement::MaximumSegmentSize(val) => {
                options[i] = 2;
                mss = val;
            }
            TcpOptionElement::WindowScale(val) => {
                options[i] = 3;
                window_scale = val;
            }
            TcpOptionElement::SelectiveAcknowledgementPermitted => {
                options[i] = 4;
            }
            TcpOptionElement::SelectiveAcknowledgement(_, _) => {
                options[i] = 5;
            }
            TcpOptionElement::Timestamp(_, _) => {
                options[i] = 6;
                has_timestamp = true;
            }
        }
    }

    Ok(TcpFingerprint {
        is_ipv4: match &ip {
            IpHeader::Version4(_, _) => true,
            IpHeader::Version6(_, _) => false,
        },
        payload_len: min(
            match &ip {
                IpHeader::Version4(header, _) => header.payload_len,
                IpHeader::Version6(header, _) => header.payload_length,
            },
            255u16,
        ) as u8,
        has_identification: match &ip {
            IpHeader::Version4(header, _) => header.identification != 0,
            IpHeader::Version6(_, _) => false,
        },
        ttl: match &ip {
            IpHeader::Version4(header, _) => header.time_to_live,
            IpHeader::Version6(header, _) => header.hop_limit,
        },
        data_offset: tcp.data_offset(),
        window_size: tcp.window_size,
        window_scale,
        mss,
        options,
        has_timestamp,
    })
}
