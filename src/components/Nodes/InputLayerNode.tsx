import { InputLayerNodeProps } from "@/types/Nodes/InputLayerNode.types";
import { Position, useReactFlow } from "@xyflow/react";
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
  selected = false,
}: InputLayerNodeProps) => {
  // 상태를 객체로 그룹화
  const [inputState, setInputState] = useState({
    shape: {
      length: Array.isArray(data.outputShape)
        ? data.outputShape[0]
        : data.outputShape,
      height: Array.isArray(data.outputShape) ? data.outputShape[0] : 0,
      width: Array.isArray(data.outputShape) ? data.outputShape[1] : 0,
      channels: Array.isArray(data.outputShape) ? data.outputShape[2] : 0,
    },
    dataFormat: data.dataFormat,
  });

  const { updateNodeData } = useReactFlow();

  // 데이터 포맷 변경 핸들러
  const handleDataFormatChange = (newFormat: DataFormat) => {
    setInputState((prev) => ({
      ...prev,
      dataFormat: newFormat,
    }));
  };

  // 형태 변경 핸들러
  const handleShapeChange = (
    dimension: keyof typeof inputState.shape,
    value: number,
  ) => {
    setInputState((prev) => ({
      ...prev,
      shape: {
        ...prev.shape,
        [dimension]: value,
      },
    }));
  };

  // 노드 데이터 업데이트
  useEffect(() => {
    const outputShape =
      inputState.dataFormat === "1D"
        ? inputState.shape.length
        : [
            inputState.shape.height,
            inputState.shape.width,
            inputState.shape.channels,
          ];

    updateNodeData(id, {
      outputShape,
      dataFormat: inputState.dataFormat,
    });
  }, [inputState, id]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div className="flex justify-between items-center">
            <div>Input</div>
            <DataFormatPopover
              currentFormat={inputState.dataFormat}
              setDataFormat={handleDataFormatChange}
            />
          </div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-col gap-1 text-xs">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [
              {inputState.dataFormat === "1D"
                ? [inputState.shape.length]
                : [
                    inputState.shape.height,
                    inputState.shape.width,
                    inputState.shape.channels,
                  ].join(", ")}
              ]
            </div>

            {inputState.dataFormat === "1D" ? (
              <NumericPopover
                initialValue={inputState.shape.length}
                label="Units"
                setValue={(value) => handleShapeChange("length", value)}
              />
            ) : (
              <>
                <div className="flex gap-2">
                  <NumericPopover
                    initialValue={inputState.shape.height}
                    label="Height"
                    setValue={(value) => handleShapeChange("height", value)}
                  />
                  <NumericPopover
                    initialValue={inputState.shape.width}
                    label="Width"
                    setValue={(value) => handleShapeChange("width", value)}
                  />
                </div>
                <NumericPopover
                  initialValue={inputState.shape.channels}
                  label="Channels"
                  setValue={(value) => handleShapeChange("channels", value)}
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
