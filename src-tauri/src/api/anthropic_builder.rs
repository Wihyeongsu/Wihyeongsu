use reqwest::header::HeaderMap;
use std::marker::PhantomData;

// Region: ---States
#[derive(Clone, Default)]
pub struct Client(reqwest::Client);
#[derive(Clone, Default)]
pub struct NoClient;
#[derive(Clone, Default)]
pub struct Method(reqwest::Method);
#[derive(Clone, Default)]
pub struct NoMethod;
#[derive(Clone, Default)]
pub struct Headers(HeaderMap);
#[derive(Clone, Default)]
pub struct NoHeaders;
#[derive(Clone, Default)]
pub struct Sealed;
#[derive(Clone, Default)]
pub struct NotSealed;

pub struct AnthropicRequest {
    pub client: reqwest::Client,
    pub method: reqwest::Method,
    pub base_url: String,
    pub headers: HeaderMap,
}

#[derive(Clone, Default)]
pub struct AnthropicRequestBuilder<C, M, H, S> {
    client: C,  // required
    method: M,  // required
    headers: H, // required
    marker_seal: PhantomData<S>,
}

impl AnthropicRequestBuilder<NoClient, NoMethod, NoHeaders, NotSealed> {
    pub fn new() -> Self {
        AnthropicRequestBuilder {
            client: NoClient,
            method: NoMethod,
            headers: NoHeaders,
            marker_seal: PhantomData,
        }
    }
}

impl<C, M, H, S> AnthropicRequestBuilder<C, M, H, S> {
    pub fn client(self, client: reqwest::Client) -> AnthropicRequestBuilder<Client, M, H, S> {
        AnthropicRequestBuilder {
            client: Client(client),
            method: self.method,
            headers: self.headers,
            marker_seal: PhantomData,
        }
    }

    pub fn method(self, method: reqwest::Method) -> AnthropicRequestBuilder<C, Method, H, S> {
        AnthropicRequestBuilder {
            client: self.client,
            method: Method(method),
            headers: self.headers,
            marker_seal: PhantomData,
        }
    }

    pub fn headers(self, headers: HeaderMap) -> AnthropicRequestBuilder<C, M, Headers, S> {
        AnthropicRequestBuilder {
            client: self.client,
            method: self.method,
            headers: Headers(headers),
            marker_seal: PhantomData,
        }
    }
}

impl<C, M, H> AnthropicRequestBuilder<C, M, H, NotSealed> {
    pub fn seal(self) -> AnthropicRequestBuilder<C, M, H, Sealed> {
        AnthropicRequestBuilder {
            client: self.client,
            method: self.method,
            headers: self.headers,
            marker_seal: PhantomData,
        }
    }
}

impl<S> AnthropicRequestBuilder<Client, Method, Headers, S> {
    pub fn build(self) -> Result<AnthropicRequest, &'static str> {
        Ok(AnthropicRequest {
            client: self.client.0,
            method: self.method.0,
            base_url: "https://api.anthropic.com".to_owned(),
            headers: self.headers.0,
        })
    }
}
