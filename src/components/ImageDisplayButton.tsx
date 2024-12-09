import React, { useState } from "react";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
  useViewport,
} from "@xyflow/react";
import { toPng } from "html-to-image";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

function ImageDisplayButton() {
  // 생성된 이미지의 URL을 저장할 상태
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { getNodes } = useReactFlow();

  // 이미지를 생성하고 상태에 저장하는 함수
  const handleImage = (dataUrl: string) => {
    setGeneratedImage(dataUrl);
    downloadImage(dataUrl);
  };

  const onClick = () => {
    const viewportElement = document.querySelector(".react-flow__viewport");
    if (!(viewportElement instanceof HTMLElement)) return;

    const imageWidth = 3840;
    const imageHeight = 2160;

    try {
      // 먼저 모든 노드의 경계를 계산합니다
      const nodesBounds = getNodesBounds(getNodes());

      // 노드 영역의 가로세로 비율을 계산합니다
      const nodesAspectRatio = nodesBounds.width / nodesBounds.height;

      // 이미지의 가로세로 비율을 계산합니다
      const imageAspectRatio = imageWidth / imageHeight;

      // 두 비율을 비교하여 적절한 변환값을 계산합니다
      let effectiveWidth = imageWidth;
      let effectiveHeight = imageHeight;

      // 노드 영역이 이미지보다 더 가로로 긴 경우
      if (nodesAspectRatio > imageAspectRatio) {
        // 가로 길이에 맞추고 세로를 조정합니다
        effectiveHeight = imageWidth / nodesAspectRatio;
      } else {
        // 세로 길이에 맞추고 가로를 조정합니다
        effectiveWidth = imageHeight * nodesAspectRatio;
      }

      // viewport 변환을 계산합니다
      const transform = getViewportForBounds(
        nodesBounds,
        effectiveWidth, // 계산된 효과적인 너비 사용
        effectiveHeight, // 계산된 효과적인 높이 사용
        0.1, // 최소 줌
        2, // 최대 줌
        0.2, // 패딩 (20%)
      );

      // 이미지 중앙 정렬을 위한 오프셋 계산
      const xOffset = (imageWidth - effectiveWidth) / 2;
      const yOffset = (imageHeight - effectiveHeight) / 2;

      toPng(viewportElement, {
        backgroundColor: "#9ca3af",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `
            translate(${transform.x + xOffset}px, ${transform.y + yOffset}px) 
            scale(${transform.zoom})
          `,
          transformOrigin: "top left",
          position: "relative",
        },
        pixelRatio: 2,
        skipAutoScale: true,
      })
        .then(handleImage)
        .catch((error) => {
          console.error("이미지 생성 실패:", error);
          alert("이미지 생성 중 문제가 발생했습니다.");
        });
    } catch (error) {
      console.error("뷰포트 처리 중 오류:", error);
    }
  };

  return (
    <>
      {/* 버튼 패널 */}
      <Panel position="top-right">
        <button
          onClick={onClick}
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
