import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position } from "@xyflow/react";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import NumberPopover from "../NumberPopover";
import { DataFormatPopover } from "../DataFormatPopover";

const InputLayerNodeComponent = ({
  id,
  data,
  isConnectable,
  selected,
}: InputLayerNodeProps) => {
  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div className="flex justify-between items-center">
            <div>Input</div>
            <DataFormatPopover
              id={id}
              currentFormat={data.dataFormat || "2D"}
              shape={data.outputShape}
              updateField="outputShape"
            />
          </div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-col gap-1 text-xs">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1">
              [{data.outputShape.join(", ")}]
            </div>

            {data.dataFormat === "1D" ? (
              <NumberPopover
                initialValue={data.outputShape[0]}
                id={id}
                fieldName="outputShape[0]"
                label="Units"
                min={1}
              />
            ) : (
              <>
                <div className="flex gap-2">
                  <NumberPopover
                    initialValue={data.outputShape[0]}
                    id={id}
                    fieldName="outputShape[0]"
                    label="Height"
                    min={1}
                  />
                  <NumberPopover
                    initialValue={data.outputShape[1]}
                    id={id}
                    fieldName="outputShape[1]"
                    label="Width"
                    min={1}
                  />
                </div>
                <NumberPopover
                  initialValue={data.outputShape[2]}
                  id={id}
                  fieldName="outputShape[2]"
                  label="Channels"
                  min={1}
                />
              </>
            )}
          </div>
        </div>

        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};

export default InputLayerNodeComponent;
