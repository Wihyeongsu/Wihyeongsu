import { getNodesBounds, getViewportForBounds, Node } from "@xyflow/react";
import { toPng } from "html-to-image";

// 이미지 다운로드
// function downloadImage(dataUrl: string) {
//   const a = document.createElement("a");

//   a.setAttribute("download", "reactflow.png");
//   a.setAttribute("href", dataUrl);
//   a.click();
// }

export const generateFlowImage = async (
  getNodes: () => Node[],
): Promise<string> => {
  const viewportElement = document.querySelector(".react-flow__viewport");
  if (!(viewportElement instanceof HTMLElement))
    throw new Error("Viewport element not found");

  const imageWidth = 3840;
  const imageHeight = 2160;

  try {
    // 모든 노드의 경계를 계산
    const nodesBounds = getNodesBounds(getNodes());

    // 노드 영역의 가로세로 비율을 계산
    const nodesAspectRatio = nodesBounds.width / nodesBounds.height;

    // 이미지의 가로세로 비율을 계산
    const imageAspectRatio = imageWidth / imageHeight;

    // 두 비율을 비교하여 적절한 변환값을 계산
    let effectiveWidth = imageWidth;
    let effectiveHeight = imageHeight;

    // 노드 영역이 이미지보다 더 가로로 긴 경우
    if (nodesAspectRatio > imageAspectRatio) {
      // 가로 길이에 맞추고 세로를 조정
      effectiveHeight = imageWidth / nodesAspectRatio;
    } else {
      // 세로 길이에 맞추고 가로를 조정
      effectiveWidth = imageHeight * nodesAspectRatio;
    }

    // viewport 변환을 계산
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

    return await toPng(viewportElement, {
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
    }).then((dataUrl) => {
      // "data:image/png;base64," 부분을 제거하고 순수 base64 데이터만 반환합니다
      return dataUrl.split(",")[1];
    });
  } catch (error) {
    console.error("뷰포트 처리 중 오류:", error);
    throw error;
  }
};
