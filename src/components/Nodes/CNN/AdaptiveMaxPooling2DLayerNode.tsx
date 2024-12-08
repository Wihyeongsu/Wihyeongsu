import { memo, useEffect, useState } from "react";
import {
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import BaseNode from "../BaseNode";
import NumericPopover from "../../NumericPopover";
import { FastForward } from "lucide-react";
import NodeContextMenu from "../../NodeContextMenu";
import { Separator } from "../../ui/separator";
import ConnectionLimitHandle from "../../Handles/ConnectionLimitHandle";
import { LayerNode } from "@/types/Nodes/Nodes.types";
import { OutputLayerNode } from "@/types/Nodes/OutputLayerNode.types";
import { isNumberNArray } from "@/utils/isNumberNArray";
import { AdaptiveMaxPooling2DLayerNodeData } from "@/types/Nodes/AdaptiveMaxPooling2DLayerNode.types";
import { FlattenLayerNode } from "@/types/Nodes/FlattenLayerNode.types";
import { LinearLayerNode } from "@/types/Nodes/LinearLayerNode.types";

export type AdaptiveMaxPooling2DLayerNodeProps = {
  id: string;
  data: AdaptiveMaxPooling2DLayerNodeData;
  isConnectable: boolean;
  selected: boolean;
};

const AdaptiveMaxPooling2DLayerNodeComponent = ({
  id,
  data,
  selected,
}: AdaptiveMaxPooling2DLayerNodeProps) => {
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

  useEffect(() => {
    if (connectedNodesData.length > 0) {
      const connectedNode = connectedNodesData[0];
      if (isNumberNArray(connectedNode.data.outputShape, 3)) {
        setInputShape({
          height: connectedNode.data.outputShape[0],
          width: connectedNode.data.outputShape[1],
          channels: connectedNode.data.outputShape[2],
        });
      }
    }
  }, [connectedNodesData]);

  useEffect(() => {
    updateNodeData(id, {
      inputShape: [inputShape.height, inputShape.width, inputShape.channels],
      outputShape: [outputShape.height, outputShape.width, inputShape.channels],
    });
  }, [inputShape, outputShape, id]);

  const handleOutputShapeChange = (
    dimension: "height" | "width",
    value: number,
  ) => {
    setOutputShape((prev) => ({
      ...prev,
      [dimension]: value,
    }));
  };

  return (
    <NodeContextMenu id={id}>
      <BaseNode selected={selected}>
        <div className="grid-flow-row">
          <div>AdaptiveAvgPool2D</div>
          <Separator className="bg-slate-300 mb-1" />

          <div className="flex flex-row justify-center items-center gap-2 mb-1">
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-xs">
              [
              {[inputShape.height, inputShape.width, inputShape.channels].join(
                ", ",
              )}
              ]
            </div>
            <FastForward className="h-4" />
            <div className="border border-gray-200 hover:border-slate-300 rounded-xl px-2 py-1 text-xs">
              [
              {[
                outputShape.height,
                outputShape.width,
                inputShape.channels,
              ].join(", ")}
              ]
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <div className="flex flex-row justify-center items-center gap-2">
              <NumericPopover
                initialValue={outputShape.height}
                label="Output H"
                setValue={(value) => handleOutputShapeChange("height", value)}
              />
              <NumericPopover
                initialValue={outputShape.width}
                label="Output W"
                setValue={(value) => handleOutputShapeChange("width", value)}
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

export default memo(AdaptiveMaxPooling2DLayerNodeComponent);
