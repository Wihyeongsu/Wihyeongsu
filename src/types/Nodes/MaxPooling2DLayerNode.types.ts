import { Node } from "@xyflow/react";
import { Activation } from "../Activation.types";

export type MaxPooling2dLayerNodeData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
  kernelSize: [number] | [number, number];
  padding: [number, number];
  stride: [number, number]; // [height, width]
  dilation?: [number, number]; // [height, width]
};

export type MaxPooling2dLayerNode = Node<
  MaxPooling2dLayerNodeData,
  "MaxPooling2DLayer"
>;

export const isMaxPooling2dLayerNode = (node: any) => {
  return !node ? false : node.type === "MaxPooling2DLayer"";
};
