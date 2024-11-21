import { Activation } from "./Activation.types";

export type LinearLayerData = {
  label: string;
  inputShape: number;
  outputShape: number;
  activation: Activation;
};

export type DenseLayerNodeProps = {
  data: LinearLayerData;
  isConnectable: boolean;
};
