import { Node } from "@xyflow/react";

export type AdaptiveAvgPooling2DLayerNodeData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
};

export type AdaptiveAvgPooling2DLayerNode = Node<
  AdaptiveAvgPooling2DLayerNodeData,
  "AdaptiveAvgPooling2DLayer"
>;

export const isAdaptiveAvgPooling2DLayerNode = (node: any) => {
  return !node ? false : node.type === "AdaptiveAvgPooling2DLayer";
};
