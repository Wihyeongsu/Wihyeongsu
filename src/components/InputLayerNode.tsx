import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position } from "@xyflow/react";

const InputLayerNodeComponent = ({
  data,
  isConnectable,
}: InputLayerNodeProps) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <div>Shape: {(data.shape = 1)}</div>
    </>
  );
};

export default InputLayerNodeComponent;
