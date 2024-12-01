import { Node } from "@xyflow/react";

export type InputLayerData = {
  outputShape: number;
};

export type InputLayerNodeProps = {
  id: string;
  data: InputLayerData;
  isConnectable: boolean;
  selected?: boolean;
};

export type InputLayerNode = Node<InputLayerData, "InputLayer">;

export const isInputLayerNode = (node: any) => {
  return !node ? false : node.type === "InputLayer";
};
