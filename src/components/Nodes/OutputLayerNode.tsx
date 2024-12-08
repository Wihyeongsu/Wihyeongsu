import { memo, useEffect, useMemo, useState } from "react";
import NodeContextMenu from "../NodeContextMenu";
import BaseNode from "./BaseNode";
import { DataFormatPopover } from "../DataFormatPopover";
import {
  OutputLayerNode,
  OutputLayerNodeProps,
} from "@/types/Nodes/OutputLayerNode.types";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import ConnectionLimitHandle from "../Handles/ConnectionLimitHandle";
import { Separator } from "@radix-ui/react-context-menu";
import { DataFormat } from "@/types/DataFormat.types";
import { Convolutional2DLayerNode } from "@/types/Nodes/Convolutional2DLayerNode.types";
import { InputLayerNode } from "@/types/Nodes/InputLayerNode.types";
import { LinearLayerNode } from "@/types/Nodes/LinearLayerNode.types";

const OutputLayerNodeComponent = ({
  data,
  id,
  selected,
}: OutputLayerNodeProps) => {
  // 입력 형태를 관리하는 상태들
  const [length, setLength] = useState<number>(1);
  const [inputHeight, setInputHeight] = useState<number>(1);
  const [inputWidth, setInputWidth] = useState<number>(1);
  const [inputChannels, setInputChannels] = useState<number>(1);
  const [dataFormat, setDataFormat] = useState(data.dataFormat);

  const { updateNodeData } = useReactFlow();

  // 연결된 노드들의 데이터를 구독
  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<Exclude<LayerNode, OutputLayerNode>>;

  // 데이터 포맷 변경을 처리하는 함수를 개선합니다
  const handleDataFormatChange = (newFormat: DataFormat) => {
    setDataFormat(newFormat);

    if (newFormat === "1D") {
      // 1D로 변경할 때는 첫 번째 차원만 사용
      setLength(inputHeight);
      updateNodeData(id, {
        inputShape: inputHeight,
        dataFormat: newFormat,
      });
    } else {
      // 3D로 변경할 때는 이전 값들을 적절히 변환
      const newHeight = 1;
      const newWidth = 1;
      const newChannels = 1;

      setInputHeight(newHeight);
      setInputWidth(newWidth);
      setInputChannels(newChannels);

      updateNodeData(id, {
        inputShape: [newHeight, newWidth, newChannels],
        dataFormat: newFormat,
      });
    }
  };

  // 연결된 노드의 변경을 처리하는 useEffect
  useEffect(() => {
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0];
      const outputShape = connectedNode.data.outputShape;

      if (typeof outputShape === "number") {
        // 1D 데이터를 받았을 때
        setLength(outputShape);
        if (dataFormat !== "1D") {
          setInputHeight(outputShape);
          setInputWidth(1);
          setInputChannels(1);
        }
      } else {
        // 3D 데이터를 받았을 때
        setLength(outputShape[0]);
        setInputHeight(outputShape[0]);
        setInputWidth(outputShape[1]);
        setInputChannels(outputShape[2]);
      }
    } else {
      // 연결이 해제된 경우 기본값으로 복원
      if (dataFormat === "1D") {
        setLength(1);
      } else {
        setInputHeight(data.inputShape[0]);
        setInputWidth(data.inputShape[1]);
        setInputChannels(data.inputShape[2]);
      }
    }
  }, [connectedNodesData, dataFormat, data.inputShape]);

  // 노드 데이터 업데이트를 처리하는 useEffect
  useEffect(() => {
    const inputShape =
      dataFormat === "1D"
        ? length
        : [inputHeight || 1, inputWidth || 1, inputChannels || 1];

    updateNodeData(id, {
      inputShape,
      dataFormat,
    });
  }, [length, inputHeight, inputWidth, inputChannels, dataFormat, id]);

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
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-center">
              [
              {dataFormat === "1D"
                ? length
                : [inputHeight || 1, inputWidth || 1, inputChannels || 1].join(
                    ", ",
                  )}
              ]
            </div>
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
