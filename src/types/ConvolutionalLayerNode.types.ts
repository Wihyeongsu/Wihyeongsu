import { Node } from "@xyflow/react";
import { Activation } from "./Activation.types";

export type ConvolutionalLayerData = {
  inputShape: number[]; // [height, width, channels]
  outputShape: number[]; // [height, width, channels]
  kernelSize: [number, number];
  filters: number;
  stride: [number, number];
  padding: "valid" | "same";
  activation: Activation;
};

export type ConvolutionalLayerNodeProps = {
  id: string;
  data: ConvolutionalLayerData;
  isConnectable: boolean;
  selected?: boolean;
};

export type ConvolutionalLayerNode = Node<
  ConvolutionalLayerData,
  "ConvolutionalLayer"
>;

export const isConvolutionalLayerNode = (node: any) => {
  return !node ? false : node.type === "ConvolutionalLayer";
};
