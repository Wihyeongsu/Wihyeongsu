import { Node } from "@xyflow/react";
import { DataFormat } from "../DataFormat.types";

export type OutputLayerData = {
  inputShape: number | [number, number, number]; // [height, width, channels]
  dataFormat: DataFormat; // Changed from optional to required
};

export type OutputLayerNodeProps = {
  id: string;
  data: OutputLayerData;
  isConnectable: boolean;
  selected?: boolean;
};

export type OutputLayerNode = Node<OutputLayerData, "OutputLayer">;

export const isOutputLayerNode = (node: any) => {
  return !node ? false : node.type === "OutputLayer";
};
