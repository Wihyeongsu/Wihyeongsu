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

const OutputLayerNodeComponent = ({
  data,
  id,
  selected,
}: OutputLayerNodeProps) => {
  const [inputShape, setInputShape] = useState<number>(data.inputShape);
  const { updateNodeData } = useReactFlow();

  const connections = useHandleConnections({
    type: "target",
  });

  // 연결된 노드들의 데이터를 구독합니다
  const nodesData = useNodesData<LayerNode>(
    connections.map((connection) => connection.source),
  ) as Array<InputLayerNode | LinearLayerNode>;

  // 연결된 노드의 outputShape 변화를 감지하고 inputShape를 업데이트합니다
  useEffect(() => {
    // 연결된 노드가 있는 경우
    if (nodesData.length > 0) {
      const connectedNode = nodesData[0]; // 첫 번째 연결된 노드의 데이터

      // 연결된 노드의 outputShape가 현재 inputShape와 다른 경우에만 업데이트
      if (connectedNode && connectedNode.data.outputShape !== inputShape) {
        setInputShape(connectedNode.data.outputShape);
      }
    } else {
      // 연결된 노드가 없는 경우 기본값으로 복원
      setInputShape(data.inputShape);
    }
  }, [nodesData, data.inputShape, inputShape]);

  // inputShape가 변경될 때 노드 데이터를 업데이트합니다
  useEffect(() => {
    updateNodeData(id, {
      inputShape: inputShape,
    });
  }, [id, inputShape, updateNodeData, connections]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
        />
        <div>Output</div>

        <Separator className="bg-slate-300" />

        <div>Shape: {inputShape}</div>
      </BaseNode>
    </NodeContextMenu>
  );
};

export default memo(OutputLayerNodeComponent);
