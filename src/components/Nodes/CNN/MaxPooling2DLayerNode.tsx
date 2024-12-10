import { memo, useEffect, useState } from "react";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import BaseNode from "../BaseNode";
import { MaxPooling2DLayerNodeData } from "@/types/Nodes/MaxPooling2DLayerNode.types";
import NumericPopover from "../../NumericPopover";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../../NodeContextMenu";
import { Separator } from "../../ui/separator";
import ConnectionLimitHandle from "../../Handles/ConnectionLimitHandle";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import { OutputLayerNode } from "@/types/Nodes/OutputLayerNode.types";
import { LinearLayerNode } from "@/types/Nodes/LinearLayerNode.types";
import { isNumberNArray } from "@/utils/isNumberNArray";
import { FlattenLayerNode } from "@/types/Nodes/FlattenLayerNode.types";

export type MaxPooling2DLayerNodeProps = {
  id: string;
  data: MaxPooling2DLayerNodeData;
  selected?: boolean;
};

const MaxPooling2DLayerNodeComponent = ({
  id,
  data,
  selected = false,
}: MaxPooling2DLayerNodeProps) => {
  // 입력과 출력 형태를 객체로 관리하여 관련 상태를 그룹화합니다
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

  // 풀링 연산의 매개변수들을 객체로 관리합니다
  const [poolingParams, setPoolingParams] = useState({
    kernel: {
      height: data.kernelSize[0],
      width: data.kernelSize[1],
    },
    stride: {
      height: data.stride[0],
      width: data.stride[1],
    },
    padding: {
      height: data.padding[0],
      width: data.padding[1],
    },
    dilation: {
      height: data.dilation[0],
      width: data.dilation[1],
    },
  });
  const { updateNodeData } = useReactFlow();

  // 연결된 노드들의 데이터를 구독
  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<
    Exclude<
      Exclude<Exclude<LayerNode, OutputLayerNode>, LinearLayerNode>,
      FlattenLayerNode
    >
  >;

  // 출력 크기를 계산하는 함수를 분리하여 재사용성과 가독성을 높입니다
  const calculateOutputShape = (
    input: typeof inputShape,
    params: typeof poolingParams,
  ) => {
    const outputHeight = Math.floor(
      (input.height +
        2 * params.padding.height -
        params.dilation.height * (params.kernel.height - 1) -
        1) /
        params.stride.height +
        1,
    );

    const outputWidth = Math.floor(
      (input.width +
        2 * params.padding.width -
        params.dilation.width * (params.kernel.width - 1) -
        1) /
        params.stride.width +
        1,
    );

    return {
      height: outputHeight,
      width: outputWidth,
      channels: input.channels,
    };
  };

  // 연결된 노드의 출력을 처리하는 useEffect
  useEffect(() => {
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0];
      if (isNumberNArray(connectedNode.data.outputShape, 3)) {
        const newInputShape = {
          height: connectedNode.data.outputShape[0],
          width: connectedNode.data.outputShape[1],
          channels: connectedNode.data.outputShape[2],
        };
        setInputShape(newInputShape);
      }
    }
  }, [connectedNodesData]);

  // 출력 크기를 업데이트하고 노드 데이터를 갱신하는 useEffect
  useEffect(() => {
    const newOutputShape = calculateOutputShape(inputShape, poolingParams);
    setOutputShape(newOutputShape);

    updateNodeData(id, {
      inputShape: [inputShape.height, inputShape.width, inputShape.channels],
      outputShape: [
        newOutputShape.height,
        newOutputShape.width,
        newOutputShape.channels,
      ],
      kernelSize: [poolingParams.kernel.height, poolingParams.kernel.width],
      stride: [poolingParams.stride.height, poolingParams.stride.width],
      padding: [poolingParams.padding.height, poolingParams.padding.width],
      dilation: [poolingParams.dilation.height, poolingParams.dilation.width],
    });
  }, [inputShape, poolingParams, id]);

  // 매개변수 업데이트 핸들러들을 생성합니다
  const handleKernelChange = (dimension: "height" | "width", value: number) => {
    setPoolingParams((prev) => ({
      ...prev,
      kernel: { ...prev.kernel, [dimension]: value },
    }));
  };

  const handleStrideChange = (dimension: "height" | "width", value: number) => {
    setPoolingParams((prev) => ({
      ...prev,
      stride: { ...prev.stride, [dimension]: value },
    }));
  };

  const handlePaddingChange = (
    dimension: "height" | "width",
    value: number,
  ) => {
    setPoolingParams((prev) => ({
      ...prev,
      padding: { ...prev.padding, [dimension]: value },
    }));
  };

  const handleDilationChange = (
    dimension: "height" | "width",
    value: number,
  ) => {
    setPoolingParams((prev) => ({
      ...prev,
      dilation: { ...prev.dilation, [dimension]: value },
    }));
  };

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>MaxPooling2D</div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-row justify-center items-center gap-2 mb-1">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [
              {[inputShape.height, inputShape.width, inputShape.channels].join(
                ", ",
              )}
              ]
            </div>
            <FastForward className="h-4" />
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

          <div className="flex flex-col gap-1 text-xs">
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={poolingParams.kernel.height}
                label="Kernel H"
                setValue={(value) => handleKernelChange("height", value)}
              />
              <NumericPopover
                initialValue={poolingParams.kernel.width}
                label="Kernel W"
                setValue={(value) => handleKernelChange("width", value)}
              />
            </div>
            {/* 비슷한 방식으로 나머지 NumericPopover 컴포넌트들도 구성 */}
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={poolingParams.stride.height}
                label="Stride H"
                setValue={(value) => handleStrideChange("height", value)}
              />
              <NumericPopover
                initialValue={poolingParams.stride.width}
                label="Stride W"
                setValue={(value) => handleStrideChange("width", value)}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={poolingParams.padding.height}
                label="Padding H"
                setValue={(value) => handlePaddingChange("height", value)}
              />
              <NumericPopover
                initialValue={poolingParams.padding.width}
                label="Padding W"
                setValue={(value) => handlePaddingChange("width", value)}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={poolingParams.dilation.height}
                label="Dilation H"
                setValue={(value) => handleDilationChange("height", value)}
              />
              <NumericPopover
                initialValue={poolingParams.dilation.width}
                label="Dilation W"
                setValue={(value) => handleDilationChange("width", value)}
              />
            </div>
          </div>
        </div>

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

export default memo(MaxPooling2DLayerNodeComponent);
