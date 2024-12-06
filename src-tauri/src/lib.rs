// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
pub mod api;

use api::{
    anthropic::AnthropicClientBuilder, HeadersBuilder, Message, MessageRequest, Usage,
    ANTHROPIC_API_KEY,
};
use serde::{Deserialize, Serialize};

#[derive(serde::Serialize)]
struct CustomResponse {
    message: String,
    other_val: usize,
}

#[tauri::command]
fn my_custom_command(name: String) -> Result<CustomResponse, String> {
    println!("Called from React");
    let message: String = format!("Hello, {}! You've been greeted from Rust!", name);
    Ok(CustomResponse {
        message,
        other_val: 42,
    })
}

// 프론트엔드로 전달할 응답 구조체를 정의합니다.
#[derive(Serialize)]
struct CommandResponse {
    content: String,
    usage: Usage,
}

#[tauri::command]
async fn anthropic_request(prompt: String) -> Result<CommandResponse, String> {
    let api_key = ANTHROPIC_API_KEY.to_owned();

    let headers = HeadersBuilder::new().api_key(api_key).build()?;
    let client = AnthropicClientBuilder::new()
        .headers(headers)
        .seal()
        .build()?;

    let request = MessageRequest {
        model: "claude-3-5-sonnet-latest".to_owned(),
        messages: vec![Message {
            role: "user".to_owned(),
            content: prompt,
        }],
        max_tokens: Some(1024),
        temperature: Some(0.7),
        system: None,
    };

    match client.create_message(request).await {
        Ok(response) => {
            // 응답의 첫 번째 텍스트 콘텐츠를 가져옵니다
            let content = response
                .content
                .first()
                .map(|c| c.text.clone())
                .unwrap_or_default();

            Ok(CommandResponse {
                content,
                usage: response.usage,
            })
        }
        Err(e) => Err(format!("Failed to send message: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_stronghold::Builder::new(|pass| todo!()).build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            my_custom_command,
            anthropic_request
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
