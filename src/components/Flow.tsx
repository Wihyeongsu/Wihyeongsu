import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode";
import DenseLayerNode from "./DenseLayerNode";
import ColorSelectorNode from "./ColorSelectorNode";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "Dense",
    type: "DenseLayer",
    data: {
      label: "Dense Layer",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "Input",
    type: "input",
    position: { x: 0, y: 200 },
    data: { label: "Input" },
  },
  {
    id: "Output",
    type: "output",
    position: { x: 200, y: 200 },
    data: { label: "Output" },
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

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  // TextUpdater: TextUpdaterNode,
  DenseLayer: DenseLayerNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
