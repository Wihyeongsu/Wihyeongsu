// src/api/error.rs
use serde::Deserialize;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Network error: {0}")]
    Network(#[from] reqwest::Error),

    #[error("Invalid request: {0}")]
    InvalidRequest(String),

    #[error("Authentication failed: {0}")]
    Authentication(String),

    #[error("Rate limit exceeded: {0}")]
    RateLimit(String),

    #[error("Server error: {0}")]
    Server(String),

    #[error("Request failed: {0}")]
    RequestFailed(String),

    #[error("Billing error: {0}")]
    BillingError(String),

    #[error("API response error: {type_} - {message}")]
    AnthropicError { type_: String, message: String },
}

// Anthropic API 에러 응답 구조체 정의
#[derive(Debug, Deserialize)]
pub struct ErrorResponse {
    #[serde(rename = "type")]
    type_: String,
    pub error: ErrorDetail,
}

#[derive(Debug, Deserialize)]
pub struct ErrorDetail {
    #[serde(rename = "type")]
    pub type_: String,
    pub message: String,
}
