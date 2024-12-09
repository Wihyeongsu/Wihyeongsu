import React from "react";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
  useViewport,
} from "@xyflow/react";
import { toPng } from "html-to-image";

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1920;
const imageHeight = 1080;

function DownloadButton() {
  // useViewport hook을 컴포넌트 최상위 레벨에서 사용
  const viewport = useViewport();
  const { getNodes } = useReactFlow();

  const onClick = () => {
    const viewportElement = document.querySelector(".react-flow__viewport");
    if (!(viewportElement instanceof HTMLElement)) {
      console.error("Viewport element not found");
      return;
    }

    try {
      // 모든 노드의 경계를 계산
      const nodesBounds = getNodesBounds(getNodes());

      // 더 넉넉한 패딩을 추가하여 여유 공간 확보
      const padding = Math.max(nodesBounds.width, nodesBounds.height) * 0.1; // 10% 패딩
      const expandedBounds = {
        x: nodesBounds.x - padding,
        y: nodesBounds.y - padding,
        width: nodesBounds.width + padding * 2,
        height: nodesBounds.height + padding * 2,
      };

      // 현재 뷰포트 상태를 고려한 변환값 계산
      const transform = getViewportForBounds(
        expandedBounds,
        imageWidth,
        imageHeight,
        viewport.zoom, // 현재 줌 레벨 사용
        4, // 최대 줌
        0.1, // 최소 줌
      );

      // 노드들이 이미지 중앙에 오도록 조정
      const centerX = (imageWidth - expandedBounds.width * transform.zoom) / 2;
      const centerY =
        (imageHeight - expandedBounds.height * transform.zoom) / 2;

      toPng(viewportElement, {
        backgroundColor: "#9ca3af",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `
            translate(${centerX}px, ${centerY}px) 
            scale(${transform.zoom})
          `,
          transformOrigin: "top left",
          position: "relative",
        },
        // 이미지 품질 향상을 위한 옵션
        pixelRatio: 2,
        skipAutoScale: true,
      })
        .then(downloadImage)
        .catch((error) => {
          console.error("Failed to generate image:", error);
          // 사용자에게 에러 알림
          alert("이미지 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
        });
    } catch (error) {
      console.error("Error processing viewport:", error);
    }
  };

  return (
    <Panel position="top-right">
      <button
        className="download-btn"
        onClick={onClick}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4f46e5",
          color: "white",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}>
        Download Image
      </button>
    </Panel>
  );
}

export default DownloadButton;
