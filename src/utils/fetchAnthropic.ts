import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";

type Usage = {
  input_token: number;
  output_token: number;
};

type CommandResponse = {
  content: string;
  usage: Usage;
};

type Payload = {
  prompt: string;
  api_key: string;
};

/**
 * Fetches a response from the Anthropic API.
 */
export const fetchAnthropicResponse = async (
  prompt: string,
  api_key: string,
) => {
  const payload: Payload = {
    prompt,
    api_key,
  };
  console.log(api_key);
  try {
    const response = await invoke<CommandResponse>("anthropic_request", {
      payload: payload,
    });
    console.log("Response:", response.content);
    console.log("Token usage:", response.usage);
  } catch (error) {
    // 에러 메시지에서 결제 관련 문제인지 확인
    // if (error.toString().includes("credit balance")) {
    //   // 사용자에게 크레딧 충전이 필요하다는 알림을 표시
    //   toast.error("You need to charge your credit balance to continue.");
    // } else {
    //   // 다른 종류의 에러 처리
    //   console.error("Error:", error);
    //   toast.error("An error occurred while fetching the response.");
    // }
    console.error("Error:", error);
    toast.error(`Error: ${error}`);
    // throw error;
  }
};
