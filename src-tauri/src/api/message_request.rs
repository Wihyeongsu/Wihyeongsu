use std::marker::PhantomData;

use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
pub struct MessageRequest {
    pub model: String,          // required
    pub max_tokens: i32,        // required
    pub messages: Vec<Message>, // required
    pub temperature: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub system: Option<String>,
}

#[derive(Debug, Serialize, Clone)]
pub struct Message {
    pub role: String,
    pub content: String,
}

// Region: ---States
#[derive(Clone, Default)]
pub struct NoModel;
#[derive(Clone, Default)]
pub struct Model(String);
#[derive(Clone, Default)]
pub struct NoMaxTokens;
#[derive(Clone, Default)]
pub struct MaxTokens(i32);
#[derive(Clone, Default)]
pub struct NoMessages;
#[derive(Clone, Default)]
pub struct Messages(Vec<Message>);
#[derive(Clone, Default)]
pub struct Sealed;
#[derive(Clone, Default)]
pub struct NotSealed;

pub struct MessageRequestBuilder<M, T, MSGS, S> {
    model: M,       // required
    max_tokens: T,  // required
    messages: MSGS, // required
    temperature: Option<f32>,
    system: Option<String>,
    marker_seal: PhantomData<S>,
}

impl MessageRequestBuilder<NoModel, NoMaxTokens, NoMessages, NotSealed> {
    pub fn new() -> Self {
        MessageRequestBuilder {
            model: NoModel,
            max_tokens: NoMaxTokens,
            messages: NoMessages,
            temperature: None,
            system: None,
            marker_seal: std::marker::PhantomData,
        }
    }
}

impl<M, T, MSGS, S> MessageRequestBuilder<M, T, MSGS, S> {
    pub fn model(self, model: impl Into<String>) -> MessageRequestBuilder<Model, T, MSGS, S> {
        MessageRequestBuilder {
            model: Model(model.into()),
            max_tokens: self.max_tokens,
            messages: self.messages,
            temperature: self.temperature,
            system: self.system,
            marker_seal: PhantomData,
        }
    }

    pub fn max_tokens(self, tokens: i32) -> MessageRequestBuilder<M, MaxTokens, MSGS, S> {
        MessageRequestBuilder {
            model: self.model,
            max_tokens: MaxTokens(tokens),
            messages: self.messages,
            temperature: self.temperature,
            system: self.system,
            marker_seal: PhantomData,
        }
    }

    pub fn messages(self, messages: Vec<Message>) -> MessageRequestBuilder<M, T, Messages, S> {
        MessageRequestBuilder {
            model: self.model,
            max_tokens: self.max_tokens,
            messages: Messages(messages),
            temperature: self.temperature,
            system: self.system,
            marker_seal: PhantomData,
        }
    }

    pub fn temperature(mut self, temperature: f32) -> Self {
        self.temperature = Some(temperature);
        self
    }

    pub fn system(mut self, system: impl Into<String>) -> Self {
        self.system = Some(system.into());
        self
    }
}

impl<M, T, MSGS> MessageRequestBuilder<M, T, MSGS, NotSealed> {
    pub fn seal(self) -> MessageRequestBuilder<M, T, MSGS, Sealed> {
        MessageRequestBuilder {
            model: self.model,
            max_tokens: self.max_tokens,
            messages: self.messages,
            temperature: self.temperature,
            system: self.system,
            marker_seal: PhantomData,
        }
    }
}

impl<S> MessageRequestBuilder<Model, MaxTokens, Messages, S> {
    pub fn build(self) -> Result<MessageRequest, &'static str> {
        Ok(MessageRequest {
            model: self.model.0,
            messages: self.messages.0,
            max_tokens: self.max_tokens.0,
            temperature: self.temperature,
            system: self.system,
        })
    }
}
