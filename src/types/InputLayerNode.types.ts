import { Node } from "@xyflow/react";
import { DataFormat } from "./DataFormat.types";

export type InputLayerData = {
  outputShape: number | [number, number, number]; // [height, width, channels]
  dataFormat: DataFormat; // Changed from optional to required
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
