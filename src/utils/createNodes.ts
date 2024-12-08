import { AvailableNodeTypes, LayerNode } from "@/types/Nodes/Nodes.types";
import { ReactFlowInstance } from "@xyflow/react";

export const createNodes = (
  nodeType: AvailableNodeTypes,
  reactFlowInstance: ReactFlowInstance,
) => {
  // 현재 뷰포트의 정보를 가져옵니다
  const { x, y, zoom } = reactFlowInstance.getViewport();

  // 화면의 중앙 좌표를 계산합니다
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // 뷰포트를 고려하여 노드의 위치를 계산합니다
  // zoom 레벨과 뷰포트의 현재 위치를 반영하여 정확한 위치를 계산합니다
  const position = {
    x: (centerX - x) / zoom,
    y: (centerY - y) / zoom,
  };

  // 새로운 노드를 생성합니다
  let newNode: LayerNode;
  switch (nodeType) {
    case "InputLayer":
      newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: {
          outputShape: [1, 1, 1], // [height, width, channels]
          dataFormat: "3D",
        },
      };
      break;
    case "LinearLayer":
      newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: {
          inputShape: 1,
          outputShape: 1,
          activation: "none",
        },
      };
      break;
    case "OutputLayer":
      newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: {
          inputShape: [1, 1, 1], // [height, width, channels]
          dataFormat: "3D",
        },
      };
      break;
    case "Convolutional2DLayer":
      newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: {
          inputShape: [1, 1, 1],
          outputShape: [1, 1, 1],
          kernelSize: [1, 1],
          filters: 1,
          stride: [1, 1],
          padding: "same",
          paddingMode: "zeros",
          activation: "none",
        },
      };
      break;
    default:
  }
  // ReactFlow 인스턴스를 통해 노드를 추가합니다
  reactFlowInstance.addNodes(newNode);
};
