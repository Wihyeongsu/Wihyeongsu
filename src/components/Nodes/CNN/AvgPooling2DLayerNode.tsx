import { memo, useEffect, useState } from "react";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import BaseNode from "../BaseNode";
import { AvgPooling2DLayerNodeData } from "@/types/Nodes/AvgPooling2DLayerNode.types";
import NumericPopover from "../../NumericPopover";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../../NodeContextMenu";
import { Separator } from "../../ui/separator";
import ConnectionLimitHandle from "../../Handles/ConnectionLimitHandle";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import { OutputLayerNode } from "@/types/Nodes/OutputLayerNode.types";
import BooleanDropdownMenu from "@/components/BooleanDropdownMenu";
import { isNumberNArray } from "@/utils/isNumberNArray";
import { FlattenLayerNode } from "@/types/Nodes/FlattenLayerNode.types";
import { LinearLayerNode } from "@/types/Nodes/LinearLayerNode.types";

export type AvgPooling2DLayerNodeProps = {
  id: string;
  data: AvgPooling2DLayerNodeData;
  selected?: boolean;
};

const AvgPooling2DLayerNodeComponent = ({
  id,
  data,
  selected = false,
}: AvgPooling2DLayerNodeProps) => {
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
    ceilMode: data.ceilMode,
    countIncludePad: data.countIncludePad,
    divisorOverride: data.divisorOverride,
  });

  const { updateNodeData } = useReactFlow();

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

  const calculateOutputShape = (
    input: typeof inputShape,
    params: typeof poolingParams,
  ) => {
    const outputHeight = Math.floor(
      (input.height + 2 * params.padding.height - params.kernel.height) /
        params.stride.height +
        1,
    );

    const outputWidth = Math.floor(
      (input.width + 2 * params.padding.width - params.kernel.width) /
        params.stride.width +
        1,
    );

    return {
      height: outputHeight,
      width: outputWidth,
      channels: input.channels,
    };
  };

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
      ceilMode: poolingParams.ceilMode,
      countIncludePad: poolingParams.countIncludePad,
      divisorOverride: poolingParams.divisorOverride,
    });
  }, [inputShape, poolingParams, id]);

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

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>AvgPooling2D</div>
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
              <BooleanDropdownMenu
                label="Ceil Mode"
                currentValue={poolingParams.ceilMode}
                setValue={(value) =>
                  setPoolingParams((prev) => ({ ...prev, ceilMode: value }))
                }
              />
              <BooleanDropdownMenu
                label="Count Include Pad"
                currentValue={poolingParams.countIncludePad}
                setValue={(value) =>
                  setPoolingParams((prev) => ({
                    ...prev,
                    countIncludePad: value,
                  }))
                }
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

export default memo(AvgPooling2DLayerNodeComponent);
