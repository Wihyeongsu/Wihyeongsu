import { Node } from "@xyflow/react";

export type AdaptiveMaxPooling2DLayerNodeData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
};

export type AdaptiveMaxPooling2DLayerNode = Node<
  AdaptiveMaxPooling2DLayerNodeData,
  "AdaptiveMaxPooling2DLayer"
>;

export const isAdaptiveMaxPooling2DLayerNode = (node: any) => {
  return !node ? false : node.type === "AdaptiveMaxPooling2DLayer";
};
