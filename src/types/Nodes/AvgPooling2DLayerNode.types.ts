import { Node } from "@xyflow/react";

export type AvgPooling2DLayerNodeData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
  kernelSize: [number, number]; // [height, width]
  padding: [number, number]; // [height, width]
  stride: [number, number]; // [height, width]
  ceilMode: boolean;
  countIncludePad: boolean;
  divisorOverride: number;
};

export type AvgPooling2DLayerNode = Node<
  AvgPooling2DLayerNodeData,
  "AvgPooling2DLayer"
>;

export const isAvgPooling2DLayerNode = (node: any) => {
  return !node ? false : node.type === "AvgPooling2DLayer";
};
