import { useState } from "react";
import { Panel, useReactFlow } from "@xyflow/react";
import { generateFlowImage } from "@/utils/generateFlowImage";
import { toast } from "sonner";

function ImageDisplayButton() {
  // 생성된 이미지의 URL을 저장할 상태
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { getNodes } = useReactFlow();

  const handleGenerateImage = async () => {
    try {
      const imageUrl = await generateFlowImage(getNodes);
      setGeneratedImage(imageUrl);
    } catch (error) {
      toast.error("Failed to generate image");
    }
  };

  return (
    <>
      {/* Button */}
      <Panel position="top-right">
        <button
          onClick={handleGenerateImage}
          className="
          px-4 py-2              
          bg-violet-600          
          text-white           
          rounded               
          border-none          
          cursor-pointer       
          hover:bg-violet-700
          transition-colors
        ">
          Show Flow Image
        </button>
      </Panel>

      {/* Image */}
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
