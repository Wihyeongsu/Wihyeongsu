import React from "react";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng } from "html-to-image";

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();

  const onClick = () => {
    // 먼저 실제 DOM 요소를 찾습니다
    const viewportElement = document.querySelector(".react-flow__viewport");
    if (!(viewportElement instanceof HTMLElement)) {
      console.error("Viewport element not found or is not an HTMLElement");
      return;
    }

    try {
      // 노드들의 실제 경계를 계산합니다
      const nodesBounds = getNodesBounds(getNodes());

      // 패딩을 추가하여 여유 공간을 확보합니다
      const padding = 50;
      nodesBounds.x -= padding;
      nodesBounds.y -= padding;
      nodesBounds.width += 2 * padding;
      nodesBounds.height += 2 * padding;

      // 뷰포트 변환값을 계산할 때 현재 줌 레벨을 고려합니다
      const transform = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.5,
        2,
        0.5,
      );

      // 이제 실제 DOM 요소와 계산된 변환 값을 사용하여 이미지를 생성합니다
      toPng(viewportElement, {
        backgroundColor: "#9ca3af",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
          transformOrigin: "top left",
          position: "relative",
        },
      })
        .then(downloadImage)
        .catch((error) => {
          console.error("Failed to generate image:", error);
        });
    } catch (error) {
      console.error("Error processing viewport:", error);
    }
  };

  return (
    <Panel position="top-right">
      <button className="download-btn" onClick={onClick}>
        Download Image
      </button>
    </Panel>
  );
}

export default DownloadButton;
