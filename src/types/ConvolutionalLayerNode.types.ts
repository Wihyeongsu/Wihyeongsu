import { Node } from "@xyflow/react";
import { Activation } from "./Activation.types";

export type PaddingType = [number, number] | "valid" | "same"; // [Vertical, Horizontal] | "valid" | "same"

export type Convolutional2DLayerData = {
  inputShape: [number, number, number]; // [height, width, channels]
  outputShape: [number, number, number]; // [height, width, channels]
  kernelSize: [number] | [number, number];
  filters: number;
  stride: [number, number]; // [Vertical, Horizontal]
  padding: PaddingType;
  paddingMode: "zeros" | "reflect" | "replicate" | "circular";
  activation: Activation;
};

export type Convolutional2DLayerNodeProps = {
  id: string;
  data: Convolutional2DLayerData;
  isConnectable: boolean;
  selected?: boolean;
};

export type Convolutional2DLayerNode = Node<
  Convolutional2DLayerData,
  "Convolutional2DLayer"
>;

export const isConvolutional2DLayerNode = (node: any) => {
  return !node ? false : node.type === "Convolutional2DLayer";
};
