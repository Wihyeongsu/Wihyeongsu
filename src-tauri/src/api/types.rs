// src/api/types.rs
use serde::{Deserialize, Serialize};

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

// Anthropic API 에러 응답 구조체 정의
#[derive(Debug, Deserialize)]
pub struct ErrorResponse {
    #[serde(rename = "type")]
    pub type_: String,
    pub error: ErrorDetail,
}

#[derive(Debug, Deserialize)]
pub struct ErrorDetail {
    #[serde(rename = "type")]
    pub type_: String,
    pub message: String,
}
