import { Activation } from "./Activation.types";
import { Node } from "@xyflow/react";

export type LinearLayerData = {
  label: string;
  nNodes: number;
  activation: Activation;
};

export type LinearLayerNodeProps = {
  data: LinearLayerData;
  isConnectable: boolean;
};

export type LinearLayerNode = Node<LinearLayerData, "LinearLayer">;

export const isLinearLayerNode = (node: any) => {
  return !node ? false : node.type === "LinearLayer";
};
