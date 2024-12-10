import { LinearLayerData } from "@/types/Nodes/LinearLayerNode.types";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { ActivationDropdownMenu } from "../../ActivationDropdownMenu";
import NodeContextMenu from "../../NodeContextMenu";
import BaseNode from "../BaseNode";
import { Separator } from "../../ui/separator";
import { FastForward } from "lucide-react";
import NumericPopover from "../../NumericPopover";
import { useEffect, useState } from "react";
import ConnectionLimitHandle from "../../Handles/ConnectionLimitHandle";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import { InputLayerNode } from "@/types/Nodes/InputLayerNode.types";
import { FlattenLayerNode } from "@/types/Nodes/FlattenLayerNode.types";
import { isNumberNArray } from "@/utils/isNumberNArray";

export type LinearLayerNodeProps = {
  id: string;
  data: LinearLayerData;
  selected?: boolean;
};

const LinearLayerNodeComponent = ({
  id,
  data,
  selected = false,
}: LinearLayerNodeProps) => {
  const [inputShape, setInputShape] = useState(data.inputShape);
  const [outputShape, setOutputShape] = useState(data.outputShape);
  const [activation, setActivation] = useState(data.activation);
  const { updateNodeData } = useReactFlow();

  // 연결된 노드들의 데이터를 구독
  const connectedNodesData = useNodesData<LayerNode>(
    useHandleConnections({
      type: "target",
    }).map((connection) => connection.source),
  ) as Array<InputLayerNode | FlattenLayerNode>;

  useEffect(() => {
    // 연결된 노드가 있는 경우
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0]; // 첫 번째 연결된 노드의 데이터
      if (typeof connectedNode.data.outputShape === "number") {
        setInputShape(connectedNode.data.outputShape);
      } else if (isNumberNArray(connectedNode.data.outputShape, 1)) {
        setInputShape(connectedNode.data.outputShape[0]);
      }
    } else {
      // 연결된 노드가 없는 경우 기본값으로 복원
      setInputShape(data.inputShape);
    }
    const updatedData = {
      inputShape: inputShape,
      outputShape: outputShape,
      activation: activation,
    };
    updateNodeData(id, updatedData);
  }, [inputShape, outputShape, activation, connectedNodesData]);

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>Linear</div>
          <Separator className="bg-slate-300 mb-1" />
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex flex-row justify-center items-center gap-2 mb-1">
              <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
                [{inputShape}]
              </div>
              <FastForward className="h-4" />
              <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-4 py-1 text-xs min-w-[80px] text-center">
                [{outputShape}]
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <NumericPopover
                initialValue={outputShape}
                label="Output"
                setValue={setOutputShape}
              />
            </div>
            <ActivationDropdownMenu
              currentActivation={activation}
              setActivation={setActivation}
              label="Activation"
            />
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

export default LinearLayerNodeComponent;
