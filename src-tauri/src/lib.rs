// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
pub mod Anthropic_api;

use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use tauri::AppHandle;
use tauri_plugin_fs::FsExt;
use tokio::fs;
use Anthropic_api::{
    anthropic::AnthropicClientBuilder, message_request::MessageRequestBuilder, HeadersBuilder,
    Message, Usage, ANTHROPIC_API_KEY,
};

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

#[derive(Serialize, Deserialize, Debug)]
struct Payload {
    prompt: String,
    api_key: String,
}

#[tauri::command]
async fn anthropic_request(payload: Payload) -> Result<CommandResponse, String> {
    // let api_key = ANTHROPIC_API_KEY.to_owned();
    println!("{payload:#?}");

    // System prompt 읽기
    let system_prompt = include_str!("./Anthropic_api/Prompt/system_prompt.txt");
    println!("{system_prompt:#?}");

    let request = MessageRequestBuilder::new()
        .model("claude-3-5-sonnet-latest")
        .max_tokens(2048)
        .messages(vec![Message {
            role: "user".to_owned(),
            content: payload.prompt,
        }])
        .temperature(0.7)
        .system(system_prompt)
        .seal()
        .build()?;

    let headers = HeadersBuilder::new().api_key(payload.api_key).build()?;

    let client = AnthropicClientBuilder::new()
        .headers(headers)
        .seal()
        .build()?;

    let response = client.create_message(request).await;

    match response {
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
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            // allowed the given directory
            let scope = app.fs_scope();
            scope.allow_directory("/path/to/directory", false);
            dbg!(scope.allowed());

            Ok(())
        })
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
