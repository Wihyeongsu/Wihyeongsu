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
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import ConnectionLimitHandle from "../Handles/ConnectionLimitHandle";

const OutputLayerNodeComponent = ({ id, selected }) => {
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
      <BaseNode selected={selected}>
        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
        />
        <div>Output</div>

        <Separator className="bg-slate-300" />
        {nodesData.map(({ data }, i) => (
          <div key={i}>
            Shape: {"outputShape" in data ? data.outputShape : "N/A"}
          </div>
        ))}
      </BaseNode>
    </NodeContextMenu>
  );
};

export default memo(OutputLayerNodeComponent);
