import { useState } from "react";
import { Panel, useReactFlow } from "@xyflow/react";
import { generateFlowImage } from "@/utils/generateFlowImage";

function ImageDisplayButton() {
  // 생성된 이미지의 URL을 저장할 상태
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { getNodes } = useReactFlow();

  const handleGenerateImage = async () => {
    try {
      const imageUrl = await generateFlowImage(getNodes);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      alert("이미지 생성 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      {/* 버튼 패널 */}
      <Panel position="top-right">
        <button
          onClick={handleGenerateImage}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4f46e5",
            color: "white",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}>
          Generate Image
        </button>
      </Panel>

      {/* 이미지 표시 영역 */}
      {generatedImage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "20px",
            borderRadius: "8px",
            zIndex: 1000,
          }}>
          <div style={{ position: "relative" }}>
            {/* 닫기 버튼 */}
            <button
              onClick={() => setGeneratedImage(null)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
                zIndex: 1001,
              }}>
              ×
            </button>
            {/* 이미지 */}
            <img
              src={generatedImage}
              alt="Generated Flow"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageDisplayButton;
