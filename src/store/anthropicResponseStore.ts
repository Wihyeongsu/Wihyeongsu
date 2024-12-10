import exportFlowToJson from "@/utils/exportFlowToJson";
import { generateFlowImage, parseBase64 } from "@/utils/generateFlowImage";
import { Node, Edge, ReactFlowInstance } from "@xyflow/react";
import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";

type Payload = {
  flow_image_base64: string;
  flow_data: string;
  api_key: string;
};

type CommandResponse = {
  content: string;
  usage: Usage;
};

type Usage = {
  input_token: number;
  output_token: number;
};

type AnthropicResponseState = {
  response: CommandResponse | null;
  api_key: string;
  isLoading: boolean;
  error: string | null;

  fetchResponse: (reactFlowInstance: ReactFlowInstance<Node, Edge>) => void;
  clearResponse: () => void;
  setApikey: (apikey: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

const useAnthropicResponseStore = create<AnthropicResponseState>(
  (set, get) => ({
    response: null,
    api_key: "",
    isLoading: false,
    error: null,

    fetchResponse: async (reactFlowInstance) => {
      try {
        set({ isLoading: true, error: null });
        const { api_key } = get();
        if (!api_key) {
          throw new Error("API KEY is required");
        }

        if (!reactFlowInstance) {
          throw new Error("ReactFlow instance is required");
        }

        const flow_image_base64 = parseBase64(
          await generateFlowImage(reactFlowInstance.getNodes),
        );

        const flow_data = exportFlowToJson(reactFlowInstance);

        const payload: Payload = {
          flow_image_base64,
          flow_data,
          api_key,
        };

        const response = await invoke<CommandResponse>("anthropic_request", {
          payload,
        });

        set({ response, isLoading: false });
      } catch (error) {
        let errorMessage = "Unknown error occurred";

        if (error instanceof Error) {
          errorMessage = error.message;

          if (error.message.includes("Network error")) {
            toast.error(
              "Network connection failed. Please check your internet connection.",
            );
          } else if (error.message.includes("Authentication failed")) {
            toast.error("Invalid API key. Please check your API key.");
          } else if (error.message.includes("Rate limit")) {
            toast.error("Rate limit exceeded. Please try again later.");
          } else if (error.message.includes("Server error")) {
            toast.error(
              "Server is currently unavailable. Please try again later.",
            );
          } else if (error.message.includes("Billing error")) {
            toast.error(
              "Insufficient credit balance. Please check your account.",
            );
          } else if (error.message.includes("image generation")) {
            toast.error("Failed to generate flow image. Please try again.");
          } else {
            toast.error(`Error: ${error.message}`);
          }
        }
        toast.error(errorMessage);
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    },

    clearResponse: () =>
      set({
        response: null,
        error: null,
      }),

    setApikey: (api_key) =>
      set({
        api_key,
      }),

    setLoading: (loading) =>
      set({
        isLoading: loading,
        error: null,
      }),

    setError: (error) =>
      set({
        error,
        isLoading: false,
      }),
  }),
);

export default useAnthropicResponseStore;
