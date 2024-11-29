import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useInput } from "@/hooks/useInput";
import { useEffect } from "react";
import ShapePopover from "./ShapePopover";

const InputLayerNodeComponent = ({
  id,
  data,
  isConnectable,
}: InputLayerNodeProps) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <Handle
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        className="w-16 !bg-teal-500"
      />

      <div className="flex">
        <div>Input</div>
        <ShapePopover initialShape={data.outputShape} id={id} type={"output"} />
      </div>
    </div>
  );
};

export default InputLayerNodeComponent;
