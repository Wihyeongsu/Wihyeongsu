import { InputNodeProps } from "@/types/InputNode.types";
import { Handle, Position } from "@xyflow/react";

export const InputNode = ({ data, isConnectable }: InputNodeProps) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
    </>
  );
};
