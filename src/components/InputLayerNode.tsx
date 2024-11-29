import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position } from "@xyflow/react";
import ShapePopover from "./ShapePopover";
import NodeContextMenu from "./NodeContextMenu";

const InputLayerNodeComponent = ({
  id,
  data,
  isConnectable,
}: InputLayerNodeProps) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <NodeContextMenu id={id}>
        <div>Input</div>
        <ShapePopover initialShape={data.outputShape} id={id} type={"output"} />

        <Handle
          type="source"
          position={Position.Right}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
          className="w-16 !bg-teal-500"
        />
      </NodeContextMenu>
    </div>
  );
};

export default InputLayerNodeComponent;
