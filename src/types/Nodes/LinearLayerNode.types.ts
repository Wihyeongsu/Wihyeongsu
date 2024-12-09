import { Activation } from "../Activation.types";
import { Node } from "@xyflow/react";

export type LinearLayerData = {
  inputShape: number;
  outputShape: number;
  activation: Activation;
};

export type LinearLayerNode = Node<LinearLayerData, "LinearLayer">;

export const isLinearLayerNode = (node: any) => {
  return !node ? false : node.type === "LinearLayer";
};
