import { InputLayerNodeProps } from "@/types/Nodes/InputLayerNode.types";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import NumericPopover from "../NumericPopover";
import { DataFormatPopover } from "../DataFormatPopover";
import { useEffect, useState } from "react";
import { DataFormat } from "@/types/DataFormat.types";
import ConnectionLimitHandle from "../Handles/ConnectionLimitHandle";

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
  const [dataFormat, setDataFormat] = useState<DataFormat>(data.dataFormat);
  const { updateNodeData } = useReactFlow();

  const handleDataFormatChange = (newFormat: DataFormat) => {
    setDataFormat(newFormat);
    // 포맷 변경 시 초기 값 설정
    if (newFormat === "1D") {
      updateNodeData(id, {
        outputShape: length,
        dataFormat: newFormat,
      });
    } else {
      updateNodeData(id, {
        outputShape: [height, width, channels],
        dataFormat: newFormat,
      });
    }
  };

  useEffect(() => {
    const outputShape =
      dataFormat === "1D" ? length : [height, width, channels];

    updateNodeData(id, {
      outputShape,
      dataFormat,
    });
  }, [length, height, width, channels, dataFormat, id]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div className="flex justify-between items-center">
            <div>Input</div>
            <DataFormatPopover
              currentFormat={dataFormat}
              setDataFormat={handleDataFormatChange}
            />
          </div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-col gap-1 text-xs">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [
              {dataFormat === "1D"
                ? [length]
                : [height, width, channels].join(", ")}
              ]
            </div>

            {dataFormat === "1D" ? (
              <NumericPopover
                initialValue={length}
                label="Units"
                setValue={setLength}
              />
            ) : (
              <>
                <div className="flex gap-2">
                  <NumericPopover
                    initialValue={height}
                    label="Height"
                    setValue={setHeight}
                  />
                  <NumericPopover
                    initialValue={width}
                    label="Width"
                    setValue={setWidth}
                  />
                </div>
                <NumericPopover
                  initialValue={channels}
                  label="Channels"
                  setValue={setChannels}
                />
              </>
            )}
          </div>
        </div>

        <ConnectionLimitHandle
          type="source"
          position={Position.Right}
          connectionCount={1}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};

export default InputLayerNodeComponent;
