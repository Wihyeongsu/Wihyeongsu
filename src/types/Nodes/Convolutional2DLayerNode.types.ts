import { Node } from "@xyflow/react";
import { Activation } from "../Activation.types";

export type PaddingType = [number, number] | "valid" | "same"; // [height, width] | "valid" | "same"
export type PaddingMode = "zeros" | "reflect" | "replicate" | "circular";
export type Convolutional2DLayerData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
  kernelSize: [number, number];
  filters: number;
  stride: [number, number]; // [height, width]
  padding: PaddingType;
  paddingMode: PaddingMode;
  dilation: [number, number]; // [height, width]
  activation: Activation;
};

export type Convolutional2DLayerNode = Node<
  Convolutional2DLayerData,
  "Convolutional2DLayer"
>;

export const isConvolutional2DLayerNode = (node: any) => {
  return !node ? false : node.type === "Convolutional2DLayer";
};
