// src/api/anthropic.rs
use crate::api::{error::*, types::*};
use reqwest::header::{HeaderMap, HeaderValue, CONTENT_TYPE};

pub struct AnthropicClient {
    client: reqwest::Client,
    api_key: String,
    base_url: String,
}

impl AnthropicClient {
    pub fn new(api_key: String) -> Self {
        Self {
            client: reqwest::Client::new(),
            api_key,
            base_url: "https://api.anthropic.com".to_string(),
        }
    }

    fn build_headers(&self) -> HeaderMap {
        let mut headers = HeaderMap::new();
        headers.insert("x-api-key", HeaderValue::from_str(&self.api_key).unwrap());
        headers.insert("anthropic-version", HeaderValue::from_static("2023-06-01"));
        headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
        headers
    }

    pub async fn create_message(
        &self,
        request: MessageRequest,
    ) -> Result<MessageResponse, ApiError> {
        self.validate_request(&request)?;

        let response = self
            .client
            .post(format!("{}/v1/messages", self.base_url))
            .headers(self.build_headers())
            .json(&request)
            .send()
            .await
            .map_err(ApiError::Network)?;

        // 먼저 상태 코드를 저장합니다
        let status = response.status();

        // 성공하지 않은 경우에만 텍스트를 읽습니다
        if !status.is_success() {
            let error_text = response
                .text()
                .await
                .unwrap_or_else(|_| "Failed to read error response".to_string());

            // 에러 응답 파싱 시도
            if let Ok(error) = serde_json::from_str::<ErrorResponse>(&error_text) {
                match error.error.type_.as_str() {
                    "invalid_request_error" if error.error.message.contains("credit balance") => {
                        return Err(ApiError::BillingError(error.error.message));
                    }
                    _ => {
                        return Err(ApiError::AnthropicError {
                            type_: error.error.type_,
                            message: error.error.message,
                        });
                    }
                }
            }

            return match status.as_u16() {
                401 => Err(ApiError::Authentication("Invalid API key".into())),
                429 => Err(ApiError::RateLimit("Too many requests".into())),
                500..=599 => Err(ApiError::Server(format!("Server error: {}", error_text))),
                _ => Err(ApiError::RequestFailed(format!(
                    "Status: {}, Error: {}",
                    status, error_text
                ))),
            };
        }

        // 성공한 경우에는 JSON으로 파싱합니다
        let message_response = response
            .json()
            .await
            .map_err(|e| ApiError::RequestFailed(format!("Failed to parse response: {}", e)))?;

        Ok(message_response)
    }

    fn validate_request(&self, request: &MessageRequest) -> Result<(), ApiError> {
        if request.messages.is_empty() {
            return Err(ApiError::InvalidRequest("Messages cannot be empty".into()));
        }

        if let Some(tokens) = request.max_tokens {
            if tokens <= 0 {
                return Err(ApiError::InvalidRequest(
                    "max_tokens must be positive".into(),
                ));
            }
        }

        if let Some(temp) = request.temperature {
            if temp < 0.0 || temp > 1.0 {
                return Err(ApiError::InvalidRequest(
                    "Temperature must be between 0 and 1".into(),
                ));
            }
        }

        Ok(())
    }
}
