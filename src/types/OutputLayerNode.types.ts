import { Node } from "@xyflow/react";

export type OutputLayerData = {
  inputShape: number;
};

export type OutputLayerNodeProps = {
  id: string;
  data: OutputLayerData;
  isConnectable: boolean;
};

export type OutputLayerNode = Node<OutputLayerData, "OutputLayer">;

export const isOutputLayerNode = (node: any) => {
  return !node ? false : node.type === "OutputLayer";
};
