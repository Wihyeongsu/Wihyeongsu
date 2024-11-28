import { LinearLayerNodeProps } from "@/types/LinearLayerNode.types";
import { Handle, Position } from "@xyflow/react";

import { useState } from "react";
import { ActivationDropdownMenu } from "./ActivationDropdownMenu";

const LinearLayerNodeComponent = ({
  data,
  isConnectable,
}: LinearLayerNodeProps) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div>{data.label}</div>
      <div>{data.nNodes}</div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />

      <ActivationDropdownMenu initialActivation={data.activation} />
    </div>
  );
};

export default LinearLayerNodeComponent;
