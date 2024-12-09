import { memo, useEffect, useState } from "react";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import BaseNode from "./BaseNode";
import { FlattenLayerNodeData } from "@/types/Nodes/FlattenLayerNode.types";
import NumericPopover from "../NumericPopover";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../NodeContextMenu";
import { Separator } from "../ui/separator";
import ConnectionLimitHandle from "../Handles/ConnectionLimitHandle";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import { OutputLayerNode } from "@/types/Nodes/OutputLayerNode.types";

export type FlattenLayerNodeProps = {
  id: string;
  data: FlattenLayerNodeData;
  selected?: boolean;
};

const FlattenLayerNodeComponent = ({
  id,
  data,
  selected,
}: FlattenLayerNodeProps) => {
  const [inputShape, setInputShape] = useState(data.inputShape);
  const [outputShape, setOutputShape] = useState(data.outputShape);
  const [params, setParams] = useState({
    startDim: data.startDim,
    endDim: data.endDim,
  });

  const { updateNodeData } = useReactFlow();

  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<Exclude<LayerNode, OutputLayerNode>>;

  // Calculate output shape
  const calculateOutputShape = (
    input: number[],
    start: number,
    end: number,
  ): number[] => {
    // 입력값 기본 검사
    if (!input || input.length === 0) {
      throw new Error("Input array cannot be empty");
    }

    // 음수 인덱스를 양수로 변환하는 헬퍼 함수
    const normalizeIndex = (index: number): number => {
      // 음수 인덱스를 배열 길이를 기준으로 양수로 변환
      return index < 0 ? input.length + index : index;
    };

    // 인덱스 정규화
    const normalizedStart = normalizeIndex(start);
    const normalizedEnd = normalizeIndex(end);

    // 정규화된 인덱스의 유효성 검사
    if (
      normalizedStart < 0 ||
      normalizedEnd >= input.length ||
      normalizedStart > normalizedEnd
    ) {
      throw new Error(
        `Invalid index range: start=${start}(${normalizedStart}), ` +
          `end=${end}(${normalizedEnd}) for array of length ${input.length}`,
      );
    }

    // 단일 값인 경우 불필요한 연산 방지
    if (normalizedStart === normalizedEnd) {
      return [...input];
    }

    // 배열을 세 부분으로 나누어 처리
    const beforeSlice = input.slice(0, normalizedStart);
    const compressedValue = input
      .slice(normalizedStart, normalizedEnd + 1)
      .reduce((acc, curr) => {
        // 오버플로우 방지를 위한 검사
        if (acc * curr > Number.MAX_SAFE_INTEGER) {
          throw new Error(
            `Multiplication result exceeds safe integer range (${acc} * ${curr})`,
          );
        }
        return acc * curr;
      }, 1);
    const afterSlice = input.slice(normalizedEnd + 1);

    // 결과 배열 생성
    return beforeSlice.concat([compressedValue], afterSlice);
  };

  // Update input shape when connected node changes
  useEffect(() => {
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0];
      setInputShape(connectedNode.data.outputShape as number[]);
    }
  }, [connectedNodesData]);

  // Update output shape and node data
  useEffect(() => {
    const newOutputShape = calculateOutputShape(
      inputShape,
      params.startDim - 1,
      params.endDim,
    );
    setOutputShape(newOutputShape);

    updateNodeData(id, {
      inputShape: inputShape,
      outputShape: newOutputShape,
      startDim: params.startDim,
      endDim: params.endDim,
    });
  }, [inputShape, params, id]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>Flatten</div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-row justify-center items-center gap-2 mb-1">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [{inputShape.join(", ")}]
            </div>
            <FastForward className="h-4" />
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
              [{outputShape.join(", ")}]
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={params.startDim}
                label="Start Dim"
                setValue={(value) =>
                  setParams((prev) => ({ ...prev, startDim: value }))
                }
              />
              <NumericPopover
                initialValue={params.endDim}
                label="End Dim"
                setValue={(value) =>
                  setParams((prev) => ({ ...prev, endDim: value }))
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

export default memo(FlattenLayerNodeComponent);
