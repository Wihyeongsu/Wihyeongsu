import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";
import { generateFlowImage } from "./generateFlowImage";
import { ReactFlowInstance, Node, Edge } from "@xyflow/react";
import exportFlowToJson from "./exportFlowToJson";

type Usage = {
  input_token: number;
  output_token: number;
};

type CommandResponse = {
  content: string;
  usage: Usage;
};

type Payload = {
  flow_image_base64: string;
  flow_data: string;
  api_key: string;
};

/**
 * Fetches a response from the Anthropic API.
 */
export const fetchAnthropicResponse = async (
  reactFlowInstance: ReactFlowInstance<Node, Edge>,
  api_key: string,
): Promise<string> => {
  try {
    // 입력값 검증
    if (!api_key) {
      throw new Error("API 키가 필요합니다");
    }
    console.log(api_key);

    if (!reactFlowInstance) {
      throw new Error("ReactFlow 인스턴스가 필요합니다");
    }

    const flow_image_base64 = await generateFlowImage(
      reactFlowInstance.getNodes,
    );

    const flow_data = exportFlowToJson(reactFlowInstance);

    const payload: Payload = {
      flow_image_base64,
      flow_data,
      api_key,
    };

    const response = await invoke<CommandResponse>("anthropic_request", {
      payload: payload,
    });
    console.log("Token usage:", response.usage);
    console.log("Response:", response.content);

    return response.content;
  } catch (error) {
    if (error instanceof Error) {
      // 에러 종류별 처리
      if (error.message.includes("이미지 생성")) {
        toast.error("이미지 생성 중 문제가 발생했습니다");
      } else if (error.message.includes("credit balance")) {
        toast.error("크레딧이 부족합니다. 충전 후 다시 시도해주세요");
      } else {
        toast.error(`오류: ${error.message}`);
      }
    } else {
      toast.error("예기치 않은 오류가 발생했습니다");
    }

    throw error; // 에러를 다시 던져서 호출자가 처리할 수 있도록 함
  }
};
