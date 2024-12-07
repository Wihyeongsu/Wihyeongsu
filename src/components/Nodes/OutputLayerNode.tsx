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

const OutputLayerNodeComponent = ({
  data,
  id,
  selected,
}: OutputLayerNodeProps) => {
  const [inputShape, setInputShape] = useState<number[]>(data.inputShape);
  const { updateNodeData } = useReactFlow();

  const connections = useHandleConnections({
    type: "target",
  });

  // 연결된 노드들의 데이터를 구독
  const nodesData = useNodesData<LayerNode>(
    connections.map((connection) => connection.source),
  ) as Array<InputLayerNode | LinearLayerNode>;

  // 연결된 노드의 outputShape 변화를 감지하고 inputShape를 업데이트
  useEffect(() => {
    // 연결된 노드가 있는 경우
    if (nodesData.length > 0) {
      const connectedNode = nodesData[0]; // 첫 번째 연결된 노드의 데이터

      // 연결된 노드의 outputShape가 현재 inputShape와 다른 경���에만 업데이트
      if (connectedNode && connectedNode.data.outputShape !== inputShape) {
        setInputShape(connectedNode.data.outputShape);
      }
    } else {
      // 연결된 노드가 없는 경우 기본값으로 복원
      setInputShape(data.inputShape);
    }
  }, [nodesData, data.inputShape, inputShape]);

  // inputShape가 변경될 때 노드 데이터를 업데이트
  useEffect(() => {
    updateNodeData(id, {
      inputShape: inputShape,
    });
  }, [id, inputShape, updateNodeData, connections]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div className="flex justify-between items-center">
            <div>Output</div>
            <DataFormatPopover
              id={id}
              currentFormat={data.dataFormat || "2D"}
              shape={inputShape}
              updateField="inputShape"
            />
          </div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-col gap-1 text-xs">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1">
              [{inputShape.join(", ")}]
            </div>

            {data.dataFormat === "1D" ? (
              <NumericPopover
                initialValue={inputShape[0]}
                id={id}
                label="Units"
              />
            ) : (
              <>
                <div className="flex gap-2">
                  <NumericPopover
                    initialValue={inputShape[0]}
                    id={id}
                    label="Height"
                  />
                  <NumericPopover
                    initialValue={inputShape[1]}
                    id={id}
                    label="Width"
                  />
                </div>
                <NumericPopover
                  initialValue={inputShape[2]}
                  id={id}
                  label="Channels"
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
