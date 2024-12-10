import useAnthropicResponseStore from "@/store/anthropicResponseStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import ClimbingBoxLoader from "./ClimbingBoxLoader";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

type CodeViewerProps = {
  onClose: () => void;
};

const CodeViewer = ({ onClose }: CodeViewerProps) => {
  const { response, isLoading, error, clearResponse } =
    useAnthropicResponseStore();
  const [code, setCode] = useState<string | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [tokens, setTokens] = useState<{
    input: number;
    output: number;
  } | null>(null);

  useEffect(() => {
    // API response update
    if (response?.content && !code) {
      setCode(response.content);
      // Animation delay
      setTimeout(() => {
        setIsContentVisible(true);
      }, 100);
      console.log(code);
      toast.success("Code generated successfully");
    }

    // Token usage update
    if (response?.usage) {
      setTokens({
        input: response.usage.input_token,
        output: response.usage.output_token,
      });
      console.log("Token usage updated:", response.usage); // 디버깅을 위한 로그
    }
  }, [response, code, isLoading]);

  // Clear store state on unmount
  useEffect(() => {
    return () => {
      clearResponse(); // store 상태도 초기화
      setIsContentVisible(false);
      setCode(null);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      onClose();
    }
  }, [error]);

  return (
    // Background overlay
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className={`bg-slate-50 rounded-xl max-w-4xl w-full transform transition-all duration-500 ease-in-out
          ${isLoading ? "max-h-[600px]" : "max-h-[90vh] overflow-y-auto"}
          ${
            !isLoading && !isContentVisible
              ? "scale-95 opacity-0"
              : "scale-100 opacity-100"
          }`}>
        <div className="p-6 rounded-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-slate-950 transition-all duration-300">
              {isLoading ? "Generating..." : "Generated Code"}
            </h2>
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Separator className="w-full bg-slate-300 my-2" />

          {/* 로딩 화면과 코드 화면 전환 */}
          <div className="relative min-h-[400px]">
            {/* 로딩 애니메이션 */}
            <div
              className={`absolute inset-0 flex justify-center items-center transition-all duration-500
                ${
                  isLoading
                    ? "opacity-100 transform scale-100"
                    : "opacity-0 transform scale-95 pointer-events-none"
                }`}>
              <ClimbingBoxLoader size={250} />
            </div>

            {/* 코드 컨텐츠 */}
            <div
              className={`transition-all duration-500 transform
                ${
                  isContentVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}>
              {!isLoading && code && tokens && (
                <div className="space-y-4">
                  <div
                    className="flex justify-start gap-8 text-xl font-semibold text-slate-700 mb-2
                    transition-all duration-300 transform">
                    <div className="flex items-center space-x-2">
                      <span>Input token:</span>
                      <span className="text-violet-600">{tokens.input}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Output token:</span>
                      <span className="text-violet-600">{tokens.output}</span>
                    </div>
                  </div>
                  {/* Code Systax Highlighter*/}
                  <div
                    className="relative w-full rounded-lg overflow-hidden
                    transition-all duration-300 transform">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        fontSize: "0.9rem",
                        backgroundColor: "#1E293B",
                      }}>
                      {code}
                    </SyntaxHighlighter>
                  </div>
                  {/* 복사 버튼 */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      toast.success("Copied to clipboard");
                    }}
                    className="px-4 py-2 bg-violet-500 text-sm font-semibold text-slate-50 
                      rounded-xl hover:bg-violet-600 transition-all duration-200
                      hover:ring-2 ring-violet-300 transform hover:scale-105">
                    Copy Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
