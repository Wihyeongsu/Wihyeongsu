import { invoke } from "@tauri-apps/api/core";

type Usage = {
  input_token: number;
  output_token: number;
};

type CommandResponse = {
  content: string;
  usage: Usage;
};

/**
 * Fetches a response from the Anthropic API.
 *
 */
export const fetchAnthropicResponse = async (prompt: string, setResponse) => {
  try {
    const response = await invoke<CommandResponse>("anthropic_request", {
      prompt,
    });
    console.log("Response:", response.content);
    console.log("Token usage:", response.usage);
    setResponse(response.content);
  } catch (error) {
    // 에러 메시지에서 결제 관련 문제인지 확인
    if (error.toString().includes("credit balance")) {
      // 사용자에게 크레딧 충전이 필요하다는 알림을 표시
      alert(
        "Billing error: Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits.",
      );
    } else {
      // 다른 종류의 에러 처리
      console.error("Error:", error);
    }
    throw error;
  }
};
