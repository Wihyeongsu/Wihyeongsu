import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeViewerProps = {
  code: string | null;
  onClose: () => void;
};

const CodeViewer = ({ code, onClose }: CodeViewerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Generated Code
            </h2>
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

          {code && (
            <div className="space-y-4">
              <div className="relative w-full rounded-lg overflow-hidden">
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

              {/* 코드 복사 버튼 */}
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Copy Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
