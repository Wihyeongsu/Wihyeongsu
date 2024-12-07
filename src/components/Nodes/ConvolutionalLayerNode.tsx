import React from "react";
import { Handle, Position } from "@xyflow/react";
import BaseNode from "./BaseNode";
import { ConvolutionalLayerNodeProps } from "@/types/ConvolutionalLayerNode.types";
import { ActivationDropdownMenu } from "../ActivationDropdownMenu";
import NumberPopover from "../NumberPopover";
import { PaddingDropdownMenu } from "../PaddingDropdownMenu";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../NodeContextMenu";
import { Separator } from "../ui/separator";

const ConvolutionalLayerNode: React.FC<ConvolutionalLayerNodeProps> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>Convolutional</div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-row items-center gap-2 mb-1">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-xs">
              [{data.inputShape.join(", ")}]
            </div>
            <FastForward className="h-4" />
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-xs">
              [{data.outputShape.join(", ")}]
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <NumberPopover
              initialValue={data.filters}
              id={id}
              fieldName="filters"
              label="Filters"
              min={1}
            />
            <div className="flex gap-2">
              <NumberPopover
                initialValue={data.kernelSize[0]}
                id={id}
                fieldName="kernelSize[0]"
                label="Kernel H"
                min={1}
              />
              <NumberPopover
                initialValue={data.kernelSize[1]}
                id={id}
                fieldName="kernelSize[1]"
                label="Kernel W"
                min={1}
              />
            </div>
            <div className="flex gap-2">
              <NumberPopover
                initialValue={data.stride[0]}
                id={id}
                fieldName="stride[0]"
                label="Stride H"
                min={1}
              />
              <NumberPopover
                initialValue={data.stride[1]}
                id={id}
                fieldName="stride[1]"
                label="Stride W"
                min={1}
              />
            </div>
            <div className="flex items-center gap-2">
              Padding:{" "}
              <PaddingDropdownMenu id={id} initialPadding={data.padding} />
            </div>
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

export default ConvolutionalLayerNode;
