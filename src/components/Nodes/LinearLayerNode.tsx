import { LinearLayerNodeProps } from "@/types/LinearLayerNode.types";
import { Handle, Position } from "@xyflow/react";

import { ActivationDropdownMenu } from "../ActivationDropdownMenu";
import ShapePopover from "../ShapePopover";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import { FastForward } from "lucide-react";
import NumberPopover from "../NumberPopover";

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
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex flex-row items-center gap-2 mb-1">
              <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1">
                [{data.inputShape.join(", ")}]
              </div>
              <FastForward className="h-4" />
              <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1">
                [{data.outputShape.join(", ")}]
              </div>
            </div>

            <div className="flex gap-2 mb-1">
              <NumberPopover
                initialValue={data.outputShape[0]}
                id={id}
                fieldName="outputShape[0]"
                label="Out H"
                min={1}
              />
              <NumberPopover
                initialValue={data.outputShape[1]}
                id={id}
                fieldName="outputShape[1]}"
                label="Out W"
                min={1}
              />
            </div>
            <NumberPopover
              initialValue={data.outputShape[2]}
              id={id}
              fieldName="outputShape[2]}"
              label="Out C"
              min={1}
            />
            <div className="flex items-center gap-2">
              Activation:{" "}
              <ActivationDropdownMenu
                id={id}
                initialActivation={data.activation}
              />
            </div>
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
          isConnectable={isConnectable}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};

export default LinearLayerNodeComponent;
