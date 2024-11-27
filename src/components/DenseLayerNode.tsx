import { DenseLayerNodeProps } from "@/types/DenseLayerNode.types";
import { Handle, Position } from "@xyflow/react";

import { useState } from "react";

const DenseLayerNode = ({ data, isConnectable }: DenseLayerNodeProps) => {
  const [activation, setActivation] = useState(data.activation);

  return (
    <div className="DenseLayer">
      {/* 입력 핸들 정의 */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div>{data.label}</div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default DenseLayerNode;
