import { useCallback, useRef } from "react";
import {
  addEdge,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/base.css";
import { nodeTypes } from "@/types/Nodes/Nodes.types";
import { isInputLayerNode } from "@/types/Nodes/InputLayerNode.types";
import { isConvolutional2DLayerNode } from "@/types/Nodes/Convolutional2DLayerNode.types";
import { isOutputLayerNode } from "@/types/Nodes/OutputLayerNode.types";
import { isLinearLayerNode } from "@/types/Nodes/LinearLayerNode.types";
import ConnectionLine from "./ConnectionLine";
import { isAvgPooling2DLayerNode } from "@/types/Nodes/AvgPooling2DLayerNode.types";
import { isMaxPooling2DLayerNode } from "@/types/Nodes/MaxPooling2DLayerNode.types";
import { isAdaptiveAvgPooling2DLayerNode } from "@/types/Nodes/AdaptiveAvgPooling2DLayerNode.types";
import { isAdaptiveMaxPooling2DLayerNode } from "@/types/Nodes/AdaptiveMaxPooling2DLayerNode.types";
import { isFlattenLayerNode } from "@/types/Nodes/FlattenLayerNode.types";
import { isNumberNArray } from "@/utils/isNumberNArray";

export const rfStyle = {
  backgroundColor: "#404040",
  opacity: 0.8,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { getNode } = useReactFlow();

  // Validate connection between nodes
  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    const sourceNode = getNode(source);
    const targetNode = getNode(target);

    if (!sourceNode || !targetNode) return false;
    if (target === source) return false;
    if (isInputLayerNode(sourceNode) && isConvolutional2DLayerNode(targetNode))
      return sourceNode.data.dataFormat === "3D";
    if (isInputLayerNode(sourceNode) && isLinearLayerNode(targetNode))
      return sourceNode.data.dataFormat === "1D";
    if (isInputLayerNode(sourceNode) && isOutputLayerNode(targetNode))
      return sourceNode.data.dataFormat === targetNode.data.dataFormat;
    if (isLinearLayerNode(sourceNode) && isOutputLayerNode(targetNode))
      return targetNode.data.dataFormat === "1D";
    if (
      (isConvolutional2DLayerNode(sourceNode) ||
        isAvgPooling2DLayerNode(sourceNode) ||
        isMaxPooling2DLayerNode(sourceNode) ||
        isAdaptiveAvgPooling2DLayerNode(sourceNode) ||
        isAdaptiveMaxPooling2DLayerNode(sourceNode)) &&
      isOutputLayerNode(targetNode)
    )
      return targetNode.data.dataFormat === "3D";
    if (
      isFlattenLayerNode(sourceNode) &&
      ((isOutputLayerNode(targetNode) && targetNode.data.dataFormat === "1D") ||
        isLinearLayerNode(targetNode))
    )
      return isNumberNArray(sourceNode.data.outputShape, 1);
    if (
      isFlattenLayerNode(sourceNode) &&
      ((isOutputLayerNode(targetNode) && targetNode.data.dataFormat === "3D") ||
        isConvolutional2DLayerNode(targetNode) ||
        isAvgPooling2DLayerNode(targetNode) ||
        isMaxPooling2DLayerNode(targetNode) ||
        isAdaptiveAvgPooling2DLayerNode(targetNode) ||
        isAdaptiveMaxPooling2DLayerNode(targetNode))
    )
      return isNumberNArray(sourceNode.data.outputShape, 3);

    return true;
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            reconnectable: true,
            style: {
              stroke: "#a78bfa", // 선의 색상
              strokeWidth: 3, // 선의 두께
              strokeLinejoin: "round", // 선의 끝 모양
              opacity: 0.8, // 투명도
              strokeDasharray: "5,5", // 점선 패턴 (필요한 경우)
              cursor: "pointer", // 마우스 커서 스타일
              transition: "stroke-width 0.2s ease", // 호버 효과를 위한 전환
            },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  return (
    <div className="flex-col flex-grow h-full flex">
      <div className="flex-grow h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          isValidConnection={isValidConnection}
          connectionLineComponent={ConnectionLine}
          fitView
          minZoom={0.1}
          maxZoom={4}
          style={rfStyle}>
          <Controls />
          {/* <DownloadButton /> */}
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
