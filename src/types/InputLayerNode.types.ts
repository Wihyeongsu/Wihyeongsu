import { Node } from "@xyflow/react";

export type InputLayerData = {
  label: string;
  shape: number;
};

export type InputLayerNodeProps = {
  data: InputLayerData;
  isConnectable: boolean;
};

export type InputLayerNode = Node<InputLayerData, "InputLayer">;

export const isInputLayerNode = (node: any) => {
  return !node ? false : node.type === "InputLayer";
};
