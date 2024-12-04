use std::marker::PhantomData;

use reqwest::header::{HeaderMap, HeaderName, HeaderValue};

use super::Headers;

// Region: ---States
#[derive(Clone, Default)]
pub struct Apikey(String);
#[derive(Clone, Default)]
pub struct NoApikey;
#[derive(Clone, Default)]
pub struct Sealed;
#[derive(Clone, Default)]
pub struct NotSealed;

#[derive(Clone)]
pub struct HeadersBuilder<A, S> {
    anthropic_beta: Vec<String>, // optional
    api_key: A,                  // required
    marker_seal: PhantomData<S>,
}

impl HeadersBuilder<NoApikey, NotSealed> {
    pub fn new() -> Self {
        HeadersBuilder {
            anthropic_beta: Vec::new(),
            api_key: NoApikey,
            marker_seal: PhantomData,
        }
    }
}

impl<A, S> HeadersBuilder<A, S> {
    pub fn anthropic_beta(mut self, anthropic_beta: impl Into<String>) -> Self {
        self.anthropic_beta.push(anthropic_beta.into());
        self
    }

    pub fn api_key(self, api_key: impl Into<String>) -> HeadersBuilder<Apikey, S> {
        HeadersBuilder {
            anthropic_beta: self.anthropic_beta,
            api_key: Apikey(api_key.into()),
            marker_seal: PhantomData,
        }
    }
}

impl<A> HeadersBuilder<A, NotSealed> {
    pub fn seal(self) -> HeadersBuilder<A, Sealed> {
        HeadersBuilder {
            anthropic_beta: self.anthropic_beta,
            api_key: self.api_key,
            marker_seal: PhantomData,
        }
    }
}

impl<S> HeadersBuilder<Apikey, S> {
    pub fn build(self) -> Result<HeaderMap, &'static str> {
        let mut headers = HeaderMap::new();

        // Vec<String>을 쉼표로 구분된 문자열로 변환
        if !self.anthropic_beta.is_empty() {
            let beta_value = self.anthropic_beta.join(",");
            headers.insert(
                "anthropic-beta",
                HeaderValue::from_str(&beta_value).unwrap(),
            );
        }

        let default_headers = [
            ("anthropic-version", "2023-06-01"),
            ("content-type", "application/json"),
        ];

        for &(key, value) in default_headers.iter() {
            headers.insert(key, HeaderValue::from_static(value));
        }
        headers.insert(
            "x-api-key",
            HeaderValue::from_str(&self.api_key.0).expect("Insert x-api-key to headers"),
        );

        Ok(headers)
    }
}
