import { Handle, Position } from "@xyflow/react";

const DensecLayerNode = ({ data, isConnectable }) => {
  return (
    <div className="FC-Layer">
      {/* 입력 핸들 정의 */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div>
        <label htmlFor="text">fcLayer</label>
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
