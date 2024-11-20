import { DenseLayerNodeProps } from "@/types/DenseLayerNode.types";
import { Handle, Position } from "@xyflow/react";

const DensecLayerNode = ({ data, isConnectable }: DenseLayerNodeProps) => {
  return (
    <div className="DenseLayer">
      {/* 입력 핸들 정의 */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div>
        <div>{data.label}</div>
        <div>
          <label htmlFor="inputShape">Input Shape:</label>
          <input type="number" id="inputShape" />
        </div>
        <div>
          <label htmlFor="outputShape">Output Shape:</label>
          <input type="number" id="outputShape" />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default DensecLayerNode;
