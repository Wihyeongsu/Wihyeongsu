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

export type MaxPooling2DLayerNodeProps = {
  id: string;
  data: MaxPooling2DLayerNodeData;
  isConnectable: boolean;
  selected: boolean;
};

const MaxPooling2DLayerNodeComponent = ({
  id,
  data,
  isConnectable,
  selected,
}: MaxPooling2DLayerNodeProps) => {
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
  const [kernelHeight, setKernelHeight] = useState(data.kernelSize[0]);
  const [kernelWidth, setKernelWidth] = useState(data.kernelSize[1]);
  const [strideHeight, setStrideHeight] = useState(data.stride[0]);
  const [strideWidth, setStrideWidth] = useState(data.stride[1]);
  const [paddingHeight, setPaddingHeight] = useState(data.padding[0]);
  const [paddingWidth, setPaddingWidth] = useState(data.padding[1]);
  const [dilationHeight, setDilationHeight] = useState<number>(
    data.dilation[0],
  );
  const [dilationWidth, setDilationWidth] = useState<number>(data.dilation[1]);

  const { updateNodeData } = useReactFlow();

  // 연결된 노드들의 데이터를 구독
  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<Exclude<LayerNode, OutputLayerNode>>;

  useEffect(() => {
    setOutputHeight(
      Math.floor(
        (inputHeight +
          2 * paddingHeight -
          dilationHeight * (kernelHeight - 1) -
          1) /
          strideHeight +
          1,
      ),
    );
    setOutputWidth(
      Math.floor(
        (inputWidth +
          2 * paddingWidth -
          dilationWidth * (kernelWidth - 1) -
          1) /
          strideWidth +
          1,
      ),
    );
    setOutputChannels(inputChannels);

    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0];
      setInputHeight(connectedNode.data.outputShape[0]);
      setInputWidth(connectedNode.data.outputShape[1]);
      setInputChannels(connectedNode.data.outputShape[2]);
    }

    const updatedData = {
      inputShape: [inputHeight, inputWidth, inputChannels],
      outputShape: [outputHeight, outputWidth, outputChannels],
      kernelSize: [kernelHeight, kernelWidth],
      stride: [strideHeight, strideWidth],
      padding: [paddingHeight, paddingWidth],
    };

    updateNodeData(id, updatedData);
  }, [
    kernelHeight,
    kernelWidth,
    strideHeight,
    strideWidth,
    paddingHeight,
    paddingWidth,
    connectedNodesData,
  ]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>MaxPooling2D</div>
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
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={kernelHeight}
                label="Kernel H"
                setValue={setKernelHeight}
              />
              <NumericPopover
                initialValue={kernelWidth}
                label="Kernel W"
                setValue={setKernelWidth}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={strideHeight}
                label="Stride H"
                setValue={setStrideHeight}
              />
              <NumericPopover
                initialValue={strideWidth}
                label="Stride W"
                setValue={setStrideWidth}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={paddingHeight}
                label="Padding H"
                setValue={setPaddingHeight}
              />
              <NumericPopover
                initialValue={paddingWidth}
                label="Padding W"
                setValue={setPaddingWidth}
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
