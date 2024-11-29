import { useCallback, useRef, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/base.css";
// import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/types/Nodes.types";
import ContextMenu from "./ContextMenu";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "node_1",
    type: "LinearLayer",
    data: {
      inputShape: 1,
      outputShape: 1,
      activation: "none",
    },
    position: { x: 0, y: 200 },
  },
  {
    id: "Input",
    type: "InputLayer",
    position: { x: 0, y: 0 },
    data: {
      outputShape: 1,
    },
  },
  {
    id: "Output",
    type: "OutputLayer",
    position: { x: 200, y: 200 },
    data: { inputShape: 1 },
  },
];

const initialEdges = [
  {
    id: "Input",
    source: "Input",
    target: "Dense",
  },
  {
    id: "Output",
    source: "Dense",
    target: "Output",
  },
];

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
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
          fitView
          style={rfStyle}>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
