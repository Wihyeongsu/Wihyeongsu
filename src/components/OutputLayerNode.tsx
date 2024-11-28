import { memo, useEffect, useState } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";
import { LayerNode } from "@/types/NodeTypes";
import {
  isLinearLayerNode,
  LinearLayerNode,
} from "@/types/LinearLayerNode.types";

const OutputLayerNodeComponent = ({ data }) => {
  const connections = useHandleConnections({
    type: "target",
  });
  const nodesData = useNodesData<LayerNode>(
    connections.map((connection) => connection.source),
  );
  const LinearNodes = nodesData.filter(isLinearLayerNode);

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div>
        {data.label}
        {LinearNodes.map(({ data }: LinearLayerNode, i) => (
          <div key={i}>Shape: {data.nNodes > 0 ? data.nNodes : 0}</div>
        ))}
      </div>
    </div>
  );
};

export default memo(OutputLayerNodeComponent);
