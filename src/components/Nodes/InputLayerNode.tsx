import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import NumericPopover from "../NumericPopover";
import { DataFormatPopover } from "../DataFormatPopover";
import { useEffect, useState } from "react";
import { DataFormat } from "@/types/DataFormat.types";

const InputLayerNodeComponent = ({
  id,
  data,
  isConnectable,
  selected,
}: InputLayerNodeProps) => {
  const [length, setLength] = useState<number>(data.outputShape[0]);
  const [height, setHeight] = useState<number>(data.outputShape[0]);
  const [width, setWidth] = useState<number>(data.outputShape[1]);
  const [channels, setChannels] = useState<number>(data.outputShape[2]);
  const outputShape2D = [height, width, channels];
  const [dataFormat, setDataFormat] = useState<DataFormat>(data.dataFormat);

  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    let updatedData;
    switch (dataFormat) {
      case "1D":
        updatedData = {
          outputShape: [length, 1, 1],
        };
        break;
      case "2D":
        updatedData = {
          outputShape: outputShape2D,
        };
        break;
    }
    updateNodeData(id, updatedData);
  }, [height, width, channels, dataFormat]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div className="flex justify-between items-center">
            <div>Input</div>
            <DataFormatPopover
              currentFormat={dataFormat}
              updateField="outputShape"
              setDataFormat={setDataFormat}
            />
          </div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-col gap-1 text-xs">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1">
              [
              {dataFormat === "1D"
                ? [length, 1, 1].join(", ")
                : outputShape2D.join(", ")}
              ]
            </div>

            {dataFormat === "1D" ? (
              <NumericPopover
                initialValue={length}
                id={id}
                label="Units"
                setValue={setLength}
              />
            ) : (
              <>
                <div className="flex gap-2">
                  <NumericPopover
                    initialValue={height}
                    id={id}
                    label="Height"
                    setValue={setHeight}
                  />
                  <NumericPopover
                    initialValue={width}
                    id={id}
                    label="Width"
                    setValue={setWidth}
                  />
                </div>
                <NumericPopover
                  initialValue={channels}
                  id={id}
                  label="Channels"
                  setValue={setChannels}
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
