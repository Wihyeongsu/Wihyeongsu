import { LinearLayerNodeProps } from "@/types/LinearLayerNode.types";
import { Handle, Position } from "@xyflow/react";

import { ActivationDropdownMenu } from "../ActivationDropdownMenu";
import ShapePopover from "../ShapePopover";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import { FastForward } from "lucide-react";

const LinearLayerNodeComponent = ({
  id,
  data,
  isConnectable,
  selected,
}: LinearLayerNodeProps) => {
  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>Linear</div>
          <Separator className="bg-slate-300 mb-1" />
          <div className="flex flex-row items-center">
            <ShapePopover
              initialShape={data.inputShape}
              id={id}
              shapeType="input"
            />
            <FastForward className="h-4" />
            <ShapePopover
              initialShape={data.outputShape}
              id={id}
              shapeType="output"
            />
          </div>

          <div>
            Activation:
            <ActivationDropdownMenu
              initialActivation={data.activation}
              id={id}
            />
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          isConnectable={isConnectable}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};

export default LinearLayerNodeComponent;
