import { Node } from "@xyflow/react";

export type MaxPooling2DLayerNodeData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
  kernelSize: [number, number]; // [height, width]
  padding: [number, number]; // [height, width]
  stride: [number, number]; // [height, width]
  dilation: [number, number]; // [height, width]
};

export type MaxPooling2DLayerNode = Node<
  MaxPooling2DLayerNodeData,
  "MaxPooling2DLayer"
>;

export const isMaxPooling2DLayerNode = (node: any) => {
  return !node ? false : node.type === "MaxPooling2DLayer";
};
