import { memo, useEffect, useState } from "react";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import BaseNode from "../BaseNode";
import { Convolutional2DLayerData } from "@/types/Nodes/Convolutional2DLayerNode.types";
import { ActivationDropdownMenu } from "../../ActivationDropdownMenu";
import NumericPopover from "../../NumericPopover";
import { PaddingDropdownMenu } from "../../PaddingDropdownMenu";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../../NodeContextMenu";
import { Separator } from "../../ui/separator";
import { PaddingModeDropdownMenu } from "../../PaddingModeDropdownMenu";
import { isNumberNArray } from "@/utils/isNumberNArray";
import ConnectionLimitHandle from "../../Handles/ConnectionLimitHandle";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import { LinearLayerNode } from "@/types/Nodes/LinearLayerNode.types";
import { OutputLayerNode } from "@/types/Nodes/OutputLayerNode.types";

export type Convolutional2DLayerNodeProps = {
  id: string;
  data: Convolutional2DLayerData;
  selected?: boolean;
};

const Convolutional2DLayerNodeComponent = ({
  id,
  data,
  selected = false,
}: Convolutional2DLayerNodeProps) => {
  // 입력과 출력의 형태를 하나의 객체로 관리하여 관련 상태들을 논리적으로 그룹화합니다
  const [inputShape, setInputShape] = useState({
    height: data.inputShape[0],
    width: data.inputShape[1],
    channels: data.inputShape[2],
  });

  const [outputShape, setOutputShape] = useState({
    height: data.outputShape[0],
    width: data.outputShape[1],
    channels: data.outputShape[2],
  });

  // 컨볼루션 연산의 주요 매개변수들을 객체로 구조화합니다
  const [convParams, setConvParams] = useState({
    filters: data.filters,
    kernel: {
      height: data.kernelSize[0],
      width: data.kernelSize[1],
    },
    stride: {
      height: data.stride[0],
      width: data.stride[1],
    },
    padding: data.padding,
    paddingSize: {
      height: 1,
      width: 1,
    },
    dilation: {
      height: data.dilation[0],
      width: data.dilation[1],
    },
  });
  const [paddingMode, setPaddingMode] = useState(data.paddingMode);
  const [activation, setActivation] = useState(data.activation);

  const { updateNodeData } = useReactFlow();

  // 연결된 노드들의 데이터를 구독
  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<Exclude<Exclude<LayerNode, OutputLayerNode>, LinearLayerNode>>;

  // 출력 크기를 계산하는 함수를 분리
  const calculateOutputShape = (
    input: typeof inputShape,
    params: typeof convParams,
  ) => {
    let outputHeight: number;
    let outputWidth: number;

    if (isNumberNArray(params.padding, 2)) {
      outputHeight = Math.floor(
        (input.height +
          2 * params.paddingSize.height -
          params.dilation.height * (params.kernel.height - 1) -
          1) /
          params.stride.height +
          1,
      );
      outputWidth = Math.floor(
        (input.width +
          2 * params.paddingSize.width -
          params.dilation.width * (params.kernel.width - 1) -
          1) /
          params.stride.width +
          1,
      );
    } else if (params.padding === "valid") {
      outputHeight = Math.floor(
        (input.height - params.kernel.height) / params.stride.height + 1,
      );
      outputWidth = Math.floor(
        (input.width - params.kernel.width) / params.stride.width + 1,
      );
    } else if (
      params.padding === "same" &&
      params.stride.height === 1 &&
      params.stride.width === 1
    ) {
      outputHeight = input.height;
      outputWidth = input.width;
    } else {
      console.log("padding: same must be stride [1, 1]");
      outputHeight = 0;
      outputWidth = 0;
    }

    return {
      height: outputHeight,
      width: outputWidth,
      channels: convParams.filters,
    };
  };

  // 연결된 노드의 변경을 처리하는 useEffect
  useEffect(() => {
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0];
      if (
        isNumberNArray(connectedNode.data.outputShape, 3) &&
        !isNumberNArray(connectedNode.data.outputShape, 2)
      ) {
        setInputShape({
          height: connectedNode.data.outputShape[0],
          width: connectedNode.data.outputShape[1],
          channels: connectedNode.data.outputShape[2],
        });
      }
    } else {
      setInputShape({
        height: data.inputShape[0],
        width: data.inputShape[1],
        channels: data.inputShape[2],
      });
    }
  }, [connectedNodesData]);

  // 출력 크기와 노드 데이터를 업데이트하는 useEffect
  useEffect(() => {
    const newOutputShape = calculateOutputShape(inputShape, convParams);
    setOutputShape(newOutputShape);

    updateNodeData(id, {
      inputShape: [inputShape.height, inputShape.width, inputShape.channels],
      outputShape: [
        newOutputShape.height,
        newOutputShape.width,
        newOutputShape.channels,
      ],
      filters: convParams.filters,
      kernelSize: [convParams.kernel.height, convParams.kernel.width],
      stride: [convParams.stride.height, convParams.stride.width],
      padding: isNumberNArray(convParams.padding, 2)
        ? [convParams.paddingSize.height, convParams.paddingSize.width]
        : convParams.padding,
      paddingMode,
      dilation: [convParams.dilation.height, convParams.dilation.width],
      activation,
    });
  }, [inputShape, convParams, paddingMode, activation]);

  // 매개변수 변경을 처리하는 핸들러들을 생성합니다
  const handleFiltersChange = (value: number) => {
    setConvParams((prev) => ({
      ...prev,
      filters: value,
    }));
  };

  const handleKernelChange = (dimension: "height" | "width", value: number) => {
    setConvParams((prev) => ({
      ...prev,
      kernel: { ...prev.kernel, [dimension]: value },
    }));
  };

  const handleStrideChange = (dimension: "height" | "width", value: number) => {
    setConvParams((prev) => ({
      ...prev,
      stride: { ...prev.stride, [dimension]: value },
    }));
  };

  const handlePaddingChange = (
    padding: [number, number] | "valid" | "same",
  ) => {
    const newConvParams = { ...convParams };
    switch (padding) {
      case "valid":
      case "same":
        newConvParams.padding = padding;
        break;
      default:
        newConvParams.padding = [
          newConvParams.paddingSize.height,
          newConvParams.paddingSize.width,
        ];
        break;
    }
    setConvParams(newConvParams);
  };

  const handlePaddingSizeChange = (
    dimension: "height" | "width",
    value: number,
  ) => {
    setConvParams((prev) => ({
      ...prev,
      paddingSize: { ...prev.paddingSize, [dimension]: value },
    }));
  };

  const handleDilationChange = (
    dimension: "height" | "width",
    value: number,
  ) => {
    setConvParams((prev) => ({
      ...prev,
      dilation: { ...prev.dilation, [dimension]: value },
    }));
  };

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>Convolutional2D</div>
          </div>
          <Separator className="bg-slate-300 mb-1" />

          {/* 입력과 출력 형태를 보여주는 시각적 표현 */}
          <div className="flex flex-row justify-center items-center gap-2 mb-1">
            {/* Input */}
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [
              {[inputShape.height, inputShape.width, inputShape.channels].join(
                ", ",
              )}
              ]
            </div>
            {/* 변환 방향을 나타내는 화살표 */}
            <FastForward className="h-4" />
            {/* Output */}
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [
              {[
                outputShape.height,
                outputShape.width,
                outputShape.channels,
              ].join(", ")}
              ]
            </div>
          </div>

          {/* Parameters */}
          <div className="flex flex-col gap-1 text-xs">
            {/* Filters */}
            <NumericPopover
              initialValue={convParams.filters}
              label="Filters"
              setValue={(value) => handleFiltersChange(value)}
            />

            {/* Kernel */}
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={convParams.kernel.height}
                label="Kernel H"
                setValue={(value) => handleKernelChange("height", value)}
              />
              <NumericPopover
                initialValue={convParams.kernel.width}
                label="Kernel W"
                setValue={(value) => handleKernelChange("width", value)}
              />
            </div>

            {/* Stride */}
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={convParams.stride.height}
                label="Stride H"
                setValue={(value) => handleStrideChange("height", value)}
              />
              <NumericPopover
                initialValue={convParams.stride.width}
                label="Stride W"
                setValue={(value) => handleStrideChange("width", value)}
              />
            </div>

            {/* Padding */}
            <div className="flex flex-row justify-center items-center gap-2">
              <PaddingDropdownMenu
                currentPadding={convParams.padding}
                setPadding={(value) => handlePaddingChange(value)}
                label="Padding">
                {isNumberNArray(convParams.padding, 2)
                  ? `[${[
                      convParams.paddingSize.height,
                      convParams.paddingSize.width,
                    ].join(",")}]`
                  : convParams.padding}
              </PaddingDropdownMenu>
              <PaddingModeDropdownMenu
                currentPaddingMode={paddingMode}
                setPaddingMode={setPaddingMode}
                label="PaddingMode"
              />
            </div>

            {/* Padding size */}
            {isNumberNArray(convParams.padding, 2) && (
              <div className="flex flex-row justify-center items-center gap-2">
                <NumericPopover
                  initialValue={convParams.paddingSize.height}
                  label="Height"
                  setValue={(value) => handlePaddingSizeChange("height", value)}
                />
                <NumericPopover
                  initialValue={convParams.paddingSize.width}
                  label="Width"
                  setValue={(value) => handlePaddingSizeChange("width", value)}
                />
              </div>
            )}

            {/* Dilation */}
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={convParams.dilation.height}
                label="Dilation H"
                setValue={(value) => handleDilationChange("height", value)}
              />
              <NumericPopover
                initialValue={convParams.dilation.width}
                label="Dilation W"
                setValue={(value) => handleDilationChange("width", value)}
              />
            </div>

            {/* Activation */}
            <ActivationDropdownMenu
              currentActivation={activation}
              setActivation={setActivation}
              label="Activation"
            />
          </div>
        </div>

        {/* Handle */}
        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
        />
        <ConnectionLimitHandle
          type="source"
          position={Position.Right}
          connectionCount={1}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};
export default memo(Convolutional2DLayerNodeComponent);
