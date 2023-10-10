//! The gRPC part of the leech.
//!
//! In server mode, the leech has a grpc server running to receive requests from kraken.
//! If the connection drops or the leech can't send the data, it will be saved in the local
//! database and pushing the data to the server is tried regularly.
//!
//! In cli mode, the leech can push the results to kraken if desired.

use std::net::SocketAddr;

use log::info;
use tonic::transport::Server;

use crate::backlog::Backlog;
use crate::config::Config;
use crate::rpc::attacks::Attacks;
use crate::rpc::rpc_attacks::req_attack_service_server::ReqAttackServiceServer;

pub mod attacks;

/// Missing docs are allowed, as the code gets auto generated by tonic
#[allow(missing_docs)]
pub mod rpc_attacks {
    use std::net::{IpAddr, Ipv4Addr, Ipv6Addr, SocketAddr};
    use std::str::FromStr;

    use ipnetwork::{IpNetwork, Ipv4Network, Ipv6Network};

    use crate::models::{BruteforceSubdomainsResult, DnsRecordType, TcpPortScanResult};
    use crate::modules::bruteforce_subdomains::BruteforceSubdomainResult;
    use crate::rpc::rpc_attacks::shared::dns_record::Record;
    use crate::rpc::rpc_attacks::shared::{
        Aaaa, Address, DnsRecord, GenericRecord, Ipv4, Ipv6, Net, NetOrAddress, A,
    };

    pub mod shared {
        tonic::include_proto!("attacks.shared");
    }

    tonic::include_proto!("attacks");

    impl From<Ipv4Addr> for Ipv4 {
        fn from(value: Ipv4Addr) -> Self {
            Self {
                address: i32::from_le_bytes(value.octets()),
            }
        }
    }

    impl From<Ipv4> for Ipv4Addr {
        fn from(value: Ipv4) -> Self {
            let [a, b, c, d] = value.address.to_le_bytes();
            Ipv4Addr::new(a, b, c, d)
        }
    }

    impl From<Ipv6> for Ipv6Addr {
        fn from(value: Ipv6) -> Self {
            let [a, b, c, d, e, f, g, h] = value.part0.to_le_bytes();
            let [i, j, k, l, m, n, o, p] = value.part1.to_le_bytes();
            Ipv6Addr::from([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p])
        }
    }

    impl From<Ipv6Addr> for Ipv6 {
        fn from(value: Ipv6Addr) -> Self {
            let [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = value.octets();
            let part0 = i64::from_le_bytes([a, b, c, d, e, f, g, h]);
            let part1 = i64::from_le_bytes([i, j, k, l, m, n, o, p]);

            Self { part0, part1 }
        }
    }

    impl From<Net> for IpNetwork {
        fn from(value: Net) -> Self {
            match value.net.unwrap() {
                shared::net::Net::Ipv4net(x) => {
                    let addr: Ipv4Addr = x.address.unwrap().into();
                    let [a, b, c, d] = x.netmask.to_le_bytes();

                    Self::V4(Ipv4Network::with_netmask(addr, Ipv4Addr::new(a, b, c, d)).unwrap())
                }
                shared::net::Net::Ipv6net(x) => {
                    let addr: Ipv6Addr = x.address.unwrap().into();
                    let [a, b, c, d, e, f, g, h] = x.netmask0.to_le_bytes();
                    let [i, j, k, l, m, n, o, p] = x.netmask1.to_le_bytes();

                    Self::V6(
                        Ipv6Network::with_netmask(
                            addr,
                            Ipv6Addr::from([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p]),
                        )
                        .unwrap(),
                    )
                }
            }
        }
    }

    impl From<NetOrAddress> for IpNetwork {
        fn from(value: NetOrAddress) -> Self {
            match value.net_or_address.unwrap() {
                shared::net_or_address::NetOrAddress::Address(x) => {
                    let addr: IpAddr = x.into();
                    match addr {
                        IpAddr::V4(x) => Self::V4(Ipv4Network::from(x)),
                        IpAddr::V6(x) => Self::V6(Ipv6Network::from(x)),
                    }
                }
                shared::net_or_address::NetOrAddress::Net(x) => x.into(),
            }
        }
    }

    impl From<BruteforceSubdomainResult> for BruteforceSubdomainResponse {
        fn from(value: BruteforceSubdomainResult) -> Self {
            Self {
                record: Some(match value {
                    BruteforceSubdomainResult::A { source, target } => DnsRecord {
                        record: Some(Record::A(A {
                            source,
                            to: Some(target.into()),
                        })),
                    },
                    BruteforceSubdomainResult::Aaaa { source, target } => DnsRecord {
                        record: Some(Record::Aaaa(Aaaa {
                            source,
                            to: Some(target.into()),
                        })),
                    },
                    BruteforceSubdomainResult::Cname { source, target } => DnsRecord {
                        record: Some(Record::Cname(GenericRecord { source, to: target })),
                    },
                }),
            }
        }
    }

    impl From<SocketAddr> for TcpPortScanResponse {
        fn from(value: SocketAddr) -> Self {
            let address = match value {
                SocketAddr::V4(v) => Address {
                    address: Some(shared::address::Address::Ipv4((*v.ip()).into())),
                },
                SocketAddr::V6(v) => Address {
                    address: Some(shared::address::Address::Ipv6((*v.ip()).into())),
                },
            };

            Self {
                address: Some(address),
                port: value.port() as u32,
            }
        }
    }

    impl From<Address> for IpAddr {
        fn from(value: Address) -> Self {
            let Address { address } = value;
            match address.unwrap() {
                shared::address::Address::Ipv4(v) => IpAddr::from(Ipv4Addr::from(v)),
                shared::address::Address::Ipv6(v) => IpAddr::from(Ipv6Addr::from(v)),
            }
        }
    }

    impl From<IpAddr> for Address {
        fn from(value: IpAddr) -> Self {
            Self {
                address: Some(match value {
                    IpAddr::V4(addr) => shared::address::Address::Ipv4(addr.into()),
                    IpAddr::V6(addr) => shared::address::Address::Ipv6(addr.into()),
                }),
            }
        }
    }

    impl From<BruteforceSubdomainsResult> for BacklogBruteforceSubdomainResult {
        fn from(value: BruteforceSubdomainsResult) -> Self {
            Self {
                attack_uuid: value.attack.to_string(),
                record: match value.dns_record_type {
                    DnsRecordType::A => Some(DnsRecord {
                        record: Some(Record::A(A {
                            source: value.source,
                            to: Some(Ipv4Addr::from_str(&value.destination).unwrap().into()),
                        })),
                    }),
                    DnsRecordType::Aaaa => Some(DnsRecord {
                        record: Some(Record::Aaaa(Aaaa {
                            source: value.source,
                            to: Some(Ipv6Addr::from_str(&value.destination).unwrap().into()),
                        })),
                    }),
                    DnsRecordType::Cname => Some(DnsRecord {
                        record: Some(Record::Cname(GenericRecord {
                            source: value.source,
                            to: value.destination,
                        })),
                    }),
                    _ => unimplemented!("type not supported"),
                },
            }
        }
    }

    impl From<Vec<BruteforceSubdomainsResult>> for BacklogBruteforceSubdomainRequest {
        fn from(value: Vec<BruteforceSubdomainsResult>) -> Self {
            let mut entries: Vec<BacklogBruteforceSubdomainResult> = Vec::new();
            entries.reserve(value.len());

            for e in value {
                entries.push(e.into());
            }

            Self { entries }
        }
    }

    impl From<TcpPortScanResult> for BacklogTcpPortScanResult {
        fn from(value: TcpPortScanResult) -> Self {
            let address = match value.address {
                IpNetwork::V4(v) => Address {
                    address: Some(shared::address::Address::Ipv4((v.ip()).into())),
                },
                IpNetwork::V6(v) => Address {
                    address: Some(shared::address::Address::Ipv6((v.ip()).into())),
                },
            };

            Self {
                attack_uuid: value.attack.to_string(),
                address: Some(address),
                port: value.port as u32, // TODO
            }
        }
    }

    impl From<Vec<TcpPortScanResult>> for BacklogTcpPortScanRequest {
        fn from(value: Vec<TcpPortScanResult>) -> Self {
            let mut entries: Vec<BacklogTcpPortScanResult> = Vec::new();
            entries.reserve(value.len());

            for e in value {
                entries.push(e.into());
            }
            Self { entries }
        }
    }
}

/// Starts the gRPC server
///
/// **Parameter**:
/// - `config`: Reference to [Config]
pub async fn start_rpc_server(config: &Config, backlog: Backlog) -> Result<(), String> {
    info!("Starting Server");
    Server::builder()
        .add_service(ReqAttackServiceServer::new(Attacks { backlog }))
        .serve(SocketAddr::new(
            config.server.listen_address.parse().unwrap(),
            config.server.listen_port,
        ))
        .await
        .unwrap();

    Ok(())
}
