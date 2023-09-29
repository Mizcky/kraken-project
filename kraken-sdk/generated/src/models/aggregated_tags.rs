/*
 * kraken
 *
 * The core component of kraken-project
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: git@omikron.dev
 * Generated by: https://openapi-generator.tech
 */

/// AggregatedTags : Set of global and local tags



#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct AggregatedTags {
    /// Global tags
    #[serde(rename = "global_tags")]
    pub global_tags: Vec<String>,
    /// Tags which are local to the workspace
    #[serde(rename = "local_tags")]
    pub local_tags: Vec<String>,
}

impl AggregatedTags {
    /// Set of global and local tags
    pub fn new(global_tags: Vec<String>, local_tags: Vec<String>) -> AggregatedTags {
        AggregatedTags {
            global_tags,
            local_tags,
        }
    }
}


