import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

type ColorSelectorNodeData = {
  color: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type ColorSelectorNodeProps = {
  data: ColorSelectorNodeData;
  isConnectable: boolean;
};

const ColorSelectorNode = memo(
  ({ data, isConnectable }: ColorSelectorNodeProps) => {
    return (
      <>
        <Handle
          type="target"
          position={Position.Left}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <div>
          Custom Color Selector Node: <strong>{data.color}</strong>
          <div>{data.label}</div>
        </div>
        <input
          className="nodrag"
          type="color"
          onChange={data.onChange}
          defaultValue={data.color}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={isConnectable}
        />
      </>
    );
  },
);

export default ColorSelectorNode;
