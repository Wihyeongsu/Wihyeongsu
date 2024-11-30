import { memo } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";
import { LayerNode } from "@/types/Nodes.types";
import {
  isLinearLayerNode,
  LinearLayerNode,
} from "@/types/LinearLayerNode.types";
import { InputLayerNode, isInputLayerNode } from "@/types/InputLayerNode.types";
import NodeContextMenu from "./NodeContextMenu";

const OutputLayerNodeComponent = ({ id }) => {
  const connections = useHandleConnections({
    type: "target",
  });

  const nodesData = useNodesData<LayerNode>(
    connections.map((connection) => connection.source),
  ).filter(
    (node) => isLinearLayerNode(node) || isInputLayerNode(node),
  ) as Array<InputLayerNode | LinearLayerNode>;

  return (
    <NodeContextMenu id={id}>
      <Handle type="target" position={Position.Left} />
      <div>
        Output
        {nodesData.map(({ data }, i) => (
          <div key={i}>
            Shape: {"outputShape" in data ? data.outputShape : "N/A"}
          </div>
        ))}
      </div>
    </NodeContextMenu>
  );
};

export default memo(OutputLayerNodeComponent);
