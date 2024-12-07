import { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import BaseNode from "./BaseNode";
import {
  Convolutional2DLayerNodeProps,
  PaddingType,
} from "@/types/ConvolutionalLayerNode.types";
import { ActivationDropdownMenu } from "../ActivationDropdownMenu";
import NumericPopover from "../NumericPopover";
import { PaddingDropdownMenu } from "../PaddingDropdownMenu";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../NodeContextMenu";
import { Separator } from "../ui/separator";
import { PaddingModeDropdownMenu } from "../PaddingModeDropdownMenu";
import { isNumberTuple } from "@/utils/isNumberTuple";

const Convolutional2DLayerNode = ({
  id,
  data,
  isConnectable,
  selected,
}: Convolutional2DLayerNodeProps) => {
  const [inputHeight, setInputHeight] = useState<number>(data.inputShape[0]);
  const [inputWidth, setInputWidth] = useState<number>(data.inputShape[1]);
  const [inputChannels, setInputChannels] = useState<number>(
    data.inputShape[2],
  );
  const [outputHeight, setOutputHeight] = useState<number>(data.outputShape[0]);
  const [outputWidth, setOutputWidth] = useState<number>(data.outputShape[1]);
  const [outputChannels, setOutputChannels] = useState<number>(
    data.outputShape[2],
  );
  const [filters, setFilters] = useState(data.filters);
  const [kernelHeight, setKernelHeight] = useState(data.kernelSize[0]);
  const [kernelWidth, setKernelWidth] = useState(data.kernelSize[1]);
  const [strideHeight, setStrideHeight] = useState(data.stride[0]);
  const [strideWidth, setStrideWidth] = useState(data.stride[1]);
  const [padding, setPadding] = useState<PaddingType>(data.padding);
  const [paddingVertical, setPaddingVertical] = useState<number>(1);
  const [paddingHorizontal, setPaddingHorizontal] = useState<number>(1);
  const [activation, setActivation] = useState(data.activation);
  const [paddingMode, setPaddingMode] = useState(data.paddingMode);
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    if (isNumberTuple(padding)) {
      setPadding([paddingVertical, paddingHorizontal]);
      setOutputHeight(
        Math.floor(
          (inputHeight + 2 * padding[0] - kernelHeight) / strideHeight + 1,
        ),
      );
      setOutputWidth(
        Math.floor(
          (inputWidth + 2 * padding[1] - kernelWidth) / strideWidth + 1,
        ),
      );
    }
    // Stride가 1이 아닌 경우 same 지원 X
    else if (padding === "same" && strideHeight !== 1 && strideWidth !== 1) {
      setOutputHeight(inputHeight);
      setOutputWidth(inputWidth);
    } else if (padding === "valid") {
      setOutputHeight(
        Math.floor((inputHeight - kernelHeight) / strideHeight + 1),
      );
      setOutputWidth(Math.floor((inputWidth - kernelWidth) / strideWidth + 1));
    }
    setOutputChannels(filters);

    const updatedData = {
      inputShape: [inputHeight, inputWidth, inputChannels],
      outputShape: [outputHeight, outputWidth, outputChannels],
      filters: filters,
      kernelSize: [kernelHeight, kernelWidth],
      stride: [strideHeight, strideWidth],
      padding: padding,
      activation: activation,
      paddingMode: paddingMode,
    };

    updateNodeData(id, updatedData);
  }, [
    inputHeight,
    inputWidth,
    inputChannels,
    filters,
    kernelHeight,
    kernelWidth,
    strideHeight,
    strideWidth,
    padding,
    paddingVertical,
    paddingHorizontal,
    paddingMode,
    activation,
    paddingMode,
  ]);

  function handlePaddingChange(paddingType: string) {
    switch (paddingType) {
      case "valid":
      case "same":
        setPadding(paddingType);
        break;
      case "[Vertical, Horizontal]":
        setPadding([paddingVertical, paddingHorizontal]);
        break;
      default:
        break;
    }
  }

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>Convolutional</div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-row justify-center items-center gap-2 mb-1">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-xs">
              [{[inputHeight, inputWidth, inputChannels].join(", ")}]
            </div>
            <FastForward className="h-4" />
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-xs">
              [{[outputHeight, outputWidth, outputChannels].join(", ")}]
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <NumericPopover
              initialValue={filters}
              id={id}
              label="Filters"
              setValue={setFilters}
            />
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={kernelHeight}
                id={id}
                label="Kernel H"
                setValue={setKernelHeight}
              />
              <NumericPopover
                initialValue={kernelWidth}
                id={id}
                label="Kernel W"
                setValue={setKernelWidth}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={strideHeight}
                id={id}
                label="Stride H"
                setValue={setStrideHeight}
              />
              <NumericPopover
                initialValue={strideWidth}
                id={id}
                label="Stride W"
                setValue={setStrideWidth}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <PaddingDropdownMenu
                currentPadding={padding}
                setPadding={handlePaddingChange}
                label="Padding"
              />
              <PaddingModeDropdownMenu
                currentPaddingMode={paddingMode}
                setPaddingMode={setPaddingMode}
                label="PaddingMode"
              />
            </div>
            {isNumberTuple(padding) && (
              <div className="flex flex-row justify-center items-center gap-2">
                <NumericPopover
                  initialValue={paddingVertical}
                  id={id}
                  label="Vertical"
                  setValue={setPaddingVertical}
                />
                <NumericPopover
                  initialValue={paddingHorizontal}
                  id={id}
                  label="Horizontal"
                  setValue={setPaddingHorizontal}
                />
              </div>
            )}
            <ActivationDropdownMenu
              currentActivation={activation}
              setActivation={setActivation}
              label="Activation"
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
          isConnectable={isConnectable}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};
export default Convolutional2DLayerNode;
