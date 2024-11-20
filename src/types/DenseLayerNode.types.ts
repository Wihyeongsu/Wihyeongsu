import { Activation } from "./Activation.types";

export type DenseLayerData = {
  label: string;
  inputShape: number;
  outputShape: number;
  activation: Activation;
};

export type DenseLayerNodeProps = {
  data: DenseLayerData;
  isConnectable: boolean;
};
