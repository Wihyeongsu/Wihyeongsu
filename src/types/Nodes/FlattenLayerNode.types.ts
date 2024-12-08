import { Node } from "@xyflow/react";

export type FlattenLayerNodeData = {
  inputShape: number[];
  outputShape: number[];
  startDim: number;
  endDim: number;
};

export type FlattenLayerNode = Node<FlattenLayerNodeData, "FlattenLayer">;

export const isFlattenLayerNode = (node: any) => {
  return !node ? false : node.type === "FlattenLayer";
};
