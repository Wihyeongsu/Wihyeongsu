import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position } from "@xyflow/react";
import ShapePopover from "../ShapePopover";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";

const InputLayerNodeComponent = ({
  id,
  data,
  isConnectable,
  selected,
}: InputLayerNodeProps) => {
  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div>Input</div>

        <Separator className="bg-slate-300" />
        <ShapePopover initialShape={data.outputShape} id={id} type={"output"} />

        <Handle
          type="source"
          position={Position.Right}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
          className=" !bg-teal-500 w-2 h-2 rounded-full"
        />
      </BaseNode>
    </NodeContextMenu>
  );
};

export default InputLayerNodeComponent;
