/*
 * kraken
 *
 * The core component of kraken-project
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: git@omikron.dev
 * Generated by: https://openapi-generator.tech
 */

/// AggregatedService : A detected service on a host



#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct AggregatedService {
    /// Global tags
    #[serde(rename = "global_tags")]
    pub global_tags: Vec<String>,
    /// Tags which are local to the workspace
    #[serde(rename = "local_tags")]
    pub local_tags: Vec<String>,
    /// The service's uuid
    #[serde(rename = "uuid")]
    pub uuid: uuid::Uuid,
    /// Name of the service
    #[serde(rename = "name")]
    pub name: String,
    /// Optional version of the service
    #[serde(rename = "version", default, with = "::serde_with::rust::double_option", skip_serializing_if = "Option::is_none")]
    pub version: Option<Option<String>>,
    /// The host this service is attached to
    #[serde(rename = "host")]
    pub host: uuid::Uuid,
    /// The port this service is attached to
    #[serde(rename = "port", default, with = "::serde_with::rust::double_option", skip_serializing_if = "Option::is_none")]
    pub port: Option<Option<uuid::Uuid>>,
    /// A comment to the service
    #[serde(rename = "comment")]
    pub comment: String,
}

impl AggregatedService {
    /// A detected service on a host
    pub fn new(global_tags: Vec<String>, local_tags: Vec<String>, uuid: uuid::Uuid, name: String, host: uuid::Uuid, comment: String) -> AggregatedService {
        AggregatedService {
            global_tags,
            local_tags,
            uuid,
            name,
            version: None,
            host,
            port: None,
            comment,
        }
    }
}

