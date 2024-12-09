import { useCallback, useRef } from "react";
import {
  addEdge,
  Connection,
  Controls,
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
import DownloadButton from "./DownloadButton";
import ConnectionLine from "./ConnectionLine";
import { connect } from "http2";

const rfStyle = {
  backgroundColor: "#00062E32",
};

const initialNodes = [];

const initialEdges = [];

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { getNode } = useReactFlow();

  // Validate connection between nodes
  const isValidConnection = (connection: Connection) => {
    const { source, target } = connection;
    const sourceNode = getNode(source);
    const targetNode = getNode(target);

    if (target === source) return false;
    if (
      isInputLayerNode(sourceNode) &&
      isConvolutional2DLayerNode(targetNode) &&
      sourceNode.data.dataFormat !== "3D"
    )
      return false;
    if (
      isInputLayerNode(sourceNode) &&
      isLinearLayerNode(targetNode) &&
      sourceNode.data.dataFormat !== "1D"
    )
      return false;
    if (
      isInputLayerNode(sourceNode) &&
      isOutputLayerNode(targetNode) &&
      sourceNode.data.dataFormat !== targetNode.data.dataFormat
    )
      return false;
    // if (sourceNode.data.outputShape !== targetNode.data.inputShape) {
    //   return false;
    // }

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
              stroke: "#22d3ee", // 선의 색상
              strokeWidth: 3, // 선의 두께
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
          style={rfStyle}>
          <Controls />
          <DownloadButton />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
