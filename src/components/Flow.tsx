import { useCallback, useRef, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import DenseLayerNode from "./DenseLayerNode";
import { InputNode } from "./InputNode";
import { useDnD } from "./DnDContext";
import Sidebar from "./Sidebar";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  Input: InputNode,
  DenseLayer: DenseLayerNode,
};

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

let id = 0;
const getId = () => `node_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

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
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={rfStyle}>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default Flow;
