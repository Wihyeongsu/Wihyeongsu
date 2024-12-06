use reqwest::{header::HeaderMap, Client};
use std::marker::PhantomData;

use super::{ApiError, ErrorResponse, MessageRequest, MessageResponse};

// Region: ---States
#[derive(Clone, Default)]
pub struct Headers(HeaderMap);
#[derive(Clone, Default)]
pub struct NoHeaders;
#[derive(Clone, Default)]
pub struct Sealed;
#[derive(Clone, Default)]
pub struct NotSealed;

pub struct AnthropicClient {
    pub client: Client,
    pub base_url: String,
    pub headers: HeaderMap,
}

impl AnthropicClient {
    pub async fn create_message(&self, body: MessageRequest) -> Result<MessageResponse, ApiError> {
        let response = self
            .client
            .post(format!("{}/v1/messages", self.base_url))
            .headers(self.headers.clone())
            .json(&body)
            .send()
            .await
            .map_err(ApiError::Network)?;

        let status = response.status();

        if !status.is_success() {
            let error_text = response
                .text()
                .await
                .unwrap_or_else(|_| "Failed to read error response".to_owned());

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

        let message_response = response
            .json()
            .await
            .map_err(|e| ApiError::RequestFailed(format!("Failed to parse response: {}", e)))?;

        Ok(message_response)
    }

    fn validate_request(&self, request: &MessageRequest) -> Result<(), ApiError> {
        // Model 검증
        // match request.model {

        // }

        // Messages 검증
        match request.messages.is_empty() {
            true => return Err(ApiError::InvalidRequest("Messages cannot be empty".into())),
            _ => (),
        }

        // Max tokens 검증
        match request.max_tokens {
            tokens if tokens <= 0 => {
                return Err(ApiError::InvalidRequest(
                    "max_tokens must be positive".into(),
                ))
            }
            _ => (),
        }

        // Temperature 범위 검증
        match request.temperature {
            Some(temp) if temp < 0.0 || temp > 1.0 => {
                return Err(ApiError::InvalidRequest(
                    "Temperature must be between 0 and 1".into(),
                ))
            }
            _ => (),
        }

        Ok(())
    }
}

#[derive(Clone, Default)]
pub struct AnthropicClientBuilder<H, S> {
    headers: H, // required
    marker_seal: PhantomData<S>,
}

impl AnthropicClientBuilder<NoHeaders, NotSealed> {
    pub fn new() -> Self {
        AnthropicClientBuilder {
            headers: NoHeaders,
            marker_seal: PhantomData,
        }
    }
}

impl<H> AnthropicClientBuilder<H, NotSealed> {
    pub fn headers(self, headers: HeaderMap) -> AnthropicClientBuilder<Headers, NotSealed> {
        AnthropicClientBuilder {
            headers: Headers(headers),
            marker_seal: PhantomData,
        }
    }

    pub fn seal(self) -> AnthropicClientBuilder<H, Sealed> {
        AnthropicClientBuilder {
            headers: self.headers,
            marker_seal: PhantomData,
        }
    }
}

impl<S> AnthropicClientBuilder<Headers, S> {
    pub fn build(self) -> Result<AnthropicClient, &'static str> {
        Ok(AnthropicClient {
            client: Client::new(),
            base_url: "https://api.anthropic.com".to_owned(),
            headers: self.headers.0,
        })
    }
}
