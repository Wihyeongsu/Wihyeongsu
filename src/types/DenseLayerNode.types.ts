import { Activation } from "./Activation.types";

export type LinearLayerData = {
  label: string;
  nNodes: number;
  activation: Activation;
};

export type DenseLayerNodeProps = {
  data: LinearLayerData;
  isConnectable: boolean;
};
