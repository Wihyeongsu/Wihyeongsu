import { memo, useEffect, useState } from "react";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import ConnectionLimitHandle from "../Handles/ConnectionLimitHandle";
import { OutputLayerNodeProps } from "@/types/OutputLayerNode.types";
import { LayerNode } from "@/types/Nodes.types";
import { InputLayerNode } from "@/types/InputLayerNode.types";
import { LinearLayerNode } from "@/types/LinearLayerNode.types";
import NumericPopover from "../NumericPopover";
import { DataFormatPopover } from "../DataFormatPopover";
import {
  Convolutional2DLayerData,
  Convolutional2DLayerNode,
} from "@/types/ConvolutionalLayerNode.types";
import { DataFormat } from "@/types/DataFormat.types";

const OutputLayerNodeComponent = ({
  data,
  id,
  selected,
}: OutputLayerNodeProps) => {
  const [inputHeight, setInputHeight] = useState<number>(data.inputShape[0]);
  const [inputWidth, setInputWidth] = useState<number>(data.inputShape[1]);
  const [inputChannels, setInputChannels] = useState<number>(
    data.inputShape[2],
  );
  const [dataFormat, setDataFormat] = useState(data.dataFormat);
  const { updateNodeData } = useReactFlow();

  // 연결된 노드들의 데이터를 구독
  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<InputLayerNode | LinearLayerNode | Convolutional2DLayerNode>;

  const handleDataFormatChange = (newFormat: DataFormat) => {
    setDataFormat(newFormat);
    // 포맷 변경 시 초기 값 설정
    if (newFormat === "1D") {
      updateNodeData(id, {
        inputShape: [inputHeight, 1, 1],
        dataFormat: newFormat,
      });
    } else {
      updateNodeData(id, {
        inputShape: [inputHeight, inputWidth, inputChannels],
        dataFormat: newFormat,
      });
    }
  };

  useEffect(() => {
    // 연결된 노드가 있는 경우
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0]; // 첫 번째 연결된 노드의 데이터

      setInputHeight(connectedNode.data.outputShape[0]);
      setInputWidth(connectedNode.data.outputShape[1]);
      setInputChannels(connectedNode.data.outputShape[2]);
    } else {
      // 연결된 노드가 없는 경우 기본값으로 복원
      setInputHeight(data.inputShape[0]);
      setInputWidth(data.inputShape[1]);
      setInputChannels(data.inputShape[2]);
    }

    const updatedData = {
      inputShape: [inputHeight, inputWidth, inputChannels],
      dataFormat: dataFormat,
    };

    updateNodeData(id, updatedData);
  }, [connectedNodesData, dataFormat]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div className="flex justify-between items-center">
            <div>Output</div>
            <DataFormatPopover
              currentFormat={dataFormat}
              setDataFormat={handleDataFormatChange}
            />
          </div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-col gap-1 text-xs">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1">
              [
              {dataFormat === "1D"
                ? [length]
                : [inputHeight, inputWidth, inputChannels].join(", ")}
              ]
            </div>

            {data.dataFormat === "1D" ? (
              <NumericPopover
                initialValue={inputHeight}
                label="Units"
                setValue={setInputHeight}
              />
            ) : (
              <>
                <div className="flex gap-2">
                  <NumericPopover
                    initialValue={inputHeight}
                    label="Height"
                    setValue={setInputHeight}
                  />
                  <NumericPopover
                    initialValue={inputWidth}
                    label="Width"
                    setValue={setInputWidth}
                  />
                </div>
                <NumericPopover
                  initialValue={inputChannels}
                  label="Channels"
                  setValue={setInputChannels}
                />
              </>
            )}
          </div>
        </div>

        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
        />
      </BaseNode>
    </NodeContextMenu>
  );
};

export default memo(OutputLayerNodeComponent);
