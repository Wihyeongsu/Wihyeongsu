import { Node } from "@xyflow/react";

export type OutputLayerData = {
  label: string;
  shape: number;
};

export type OutputLayerNodeProps = {
  data: OutputLayerData;
  isConnectable: boolean;
};

export type OutputLayerNode = Node<OutputLayerData, "OutputLayer">;

export const isOutputLayerNode = (node: any) => {
  return !node ? false : node.type === "OutputLayer";
};
