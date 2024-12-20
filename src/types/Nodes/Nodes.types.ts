import { LinearLayerNode } from "./LinearLayerNode.types";
import { InputLayerNode } from "./InputLayerNode.types";
import { OutputLayerNode } from "./OutputLayerNode.types";
import { Convolutional2DLayerNode } from "./Convolutional2DLayerNode.types";
import { MaxPooling2DLayerNode } from "./MaxPooling2DLayerNode.types";
import { AvgPooling2DLayerNode } from "./AvgPooling2DLayerNode.types";
import { AdaptiveMaxPooling2DLayerNode } from "./AdaptiveMaxPooling2DLayerNode.types";
import { AdaptiveAvgPooling2DLayerNode } from "./AdaptiveAvgPooling2DLayerNode.types";
import { FlattenLayerNode } from "./FlattenLayerNode.types";
import InputLayerNodeComponent from "@/components/Nodes/InputLayerNode";
import LinearLayerNodeComponent from "@/components/Nodes/DNN/LinearLayerNode";
import OutputLayerNodeComponent from "@/components/Nodes/OutputLayerNode";
import Convolutional2DLayerNodeComponent from "@/components/Nodes/CNN/ConvolutionalLayerNode";
import MaxPooling2DLayerNodeComponent from "@/components/Nodes/CNN/MaxPooling2DLayerNode";
import AvgPooling2DLayerNodeComponent from "@/components/Nodes/CNN/AvgPooling2DLayerNode";
import AdaptiveMaxPooling2DLayerNodeComponent from "@/components/Nodes/CNN/AdaptiveMaxPooling2DLayerNode";
import AdaptiveAvgPooling2DLayerNodeComponent from "@/components/Nodes/CNN/AdaptiveAvgPooling2DLayerNode";
import FlattenLayerNodeComponent from "@/components/Nodes/FlattenLayerNode";

const NodeTypes = [
  "InputLayer",
  "LinearLayer",
  "OutputLayer",
  "Convolutional2DLayer",
  "MaxPooling2DLayer",
  "AvgPooling2DLayer",
  "AdaptiveMaxPooling2DLayer",
  "AdaptiveAvgPooling2DLayer",
  "FlattenLayer",
] as const;
export type AvailableNodeTypes = (typeof NodeTypes)[number];
export type LayerNode = {
  InputLayer: InputLayerNode;
  LinearLayer: LinearLayerNode;
  OutputLayer: OutputLayerNode;
  Convolutional2DLayer: Convolutional2DLayerNode;
  MaxPooling2DLayer: MaxPooling2DLayerNode;
  AvgPooling2DLayer: AvgPooling2DLayerNode;
  AdaptiveMaxPooling2DLayer: AdaptiveMaxPooling2DLayerNode;
  AdaptiveAvgPooling2DLayer: AdaptiveAvgPooling2DLayerNode;
  FlattenLayer: FlattenLayerNode;
}[AvailableNodeTypes];

// 사이드바에 표시될 노드 항목의 타입을 정의합니다
type NodeTypeInfo = {
  type: AvailableNodeTypes;
  label: string;
  description?: string; // 선택적으로 설명을 추가할 수 있습니다
};

// nodeTypes 객체의 타입을 명시적으로 정의합니다
export const nodeTypes = {
  InputLayer: InputLayerNodeComponent,
  LinearLayer: LinearLayerNodeComponent,
  OutputLayer: OutputLayerNodeComponent,
  Convolutional2DLayer: Convolutional2DLayerNodeComponent,
  MaxPooling2DLayer: MaxPooling2DLayerNodeComponent,
  AvgPooling2DLayer: AvgPooling2DLayerNodeComponent,
  AdaptiveMaxPooling2DLayer: AdaptiveMaxPooling2DLayerNodeComponent,
  AdaptiveAvgPooling2DLayer: AdaptiveAvgPooling2DLayerNodeComponent,
  FlattenLayer: FlattenLayerNodeComponent,
} as const; // as const를 사용하여 타입을 더 엄격하게 만듭니다

// 사이드바에 표시될 노드 타입들을 정의합니다
export const nodeTypesSidebar: NodeTypeInfo[] = [
  {
    type: "InputLayer",
    label: "Input Layer",
    description: "Neural network input layer", // 선택적 설명 추가
  },
  {
    type: "LinearLayer",
    label: "Linear Layer",
    description: "Fully connected layer with linear transformation",
  },
  {
    type: "OutputLayer",
    label: "Output Layer",
    description: "Neural network output layer",
  },
  {
    type: "Convolutional2DLayer",
    label: "Convolutional2D Layer",
    description: "2D Convolutional layer for feature extraction",
  },
  {
    type: "MaxPooling2DLayer",
    label: "MaxPooling2D Layer",
    description: "2D MaxPooling layer for down-sampling",
  },
  {
    type: "AvgPooling2DLayer",
    label: "AvgPooling2D Layer",
    description: "2D Average Pooling layer for down-sampling",
  },
  {
    type: "AdaptiveMaxPooling2DLayer",
    label: "AdaptiveMaxPooling2D Layer",
    description: "2D Adaptive Max Pooling layer for flexible down-sampling",
  },
  {
    type: "AdaptiveAvgPooling2DLayer",
    label: "AdaptiveAvgPooling2D Layer",
    description: "2D Adaptive Average Pooling layer for flexible down-sampling",
  },
  {
    type: "FlattenLayer",
    label: "Flatten Layer",
    description: "Flattens the input tensor into a 1D vector",
  },
];

// 노드 타입 유효성 검사를 위한 헬퍼 함수
export function isValidNodeType(type: string): type is AvailableNodeTypes {
  return type in nodeTypes;
}
