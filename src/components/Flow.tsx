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
import { nodeTypes } from "@/types/Nodes.types";
import { isInputLayerNode } from "@/types/InputLayerNode.types";
import { isConvolutional2DLayerNode } from "@/types/ConvolutionalLayerNode.types";
import { isOutputLayerNode } from "@/types/OutputLayerNode.types";
import { isLinearLayerNode } from "@/types/LinearLayerNode.types";

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
          isValidConnection={isValidConnection}
          fitView
          style={rfStyle}>
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
