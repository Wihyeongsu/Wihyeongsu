// src/api/types.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct Message {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize)]
pub struct MessageRequest {
    pub model: String,
    pub messages: Vec<Message>,
    pub max_tokens: Option<i32>,
    pub temperature: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub system: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct MessageResponse {
    pub id: String,
    pub role: String,
    pub content: Vec<MessageContent>,
    pub model: String,
    pub stop_reason: Option<String>,
    pub stop_sequence: Option<String>,
    pub usage: Usage,
}

#[derive(Debug, Deserialize)]
pub struct MessageContent {
    pub text: String,
    pub r#type: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Usage {
    pub input_tokens: i32,
    pub output_tokens: i32,
}
