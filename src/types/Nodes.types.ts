import { LinearLayerNode } from "./LinearLayerNode.types";
import { InputLayerNode } from "./InputLayerNode.types";
import { OutputLayerNode } from "./OutputLayerNode.types";
import { ConvolutionalLayerNode } from "./ConvolutionalLayerNode.types";
import InputLayerNodeComponent from "@/components/Nodes/InputLayerNode";
import LinearLayerNodeComponent from "@/components/Nodes/LinearLayerNode";
import OutputLayerNodeComponent from "@/components/Nodes/OutputLayerNode";
import ConvolutionalLayerNodeComponent from "@/components/Nodes/ConvolutionalLayerNode";

// 먼저 사용 가능한 노드 타입들을 유니온 타입으로 정의합���다
export type AvailableNodeTypes =
  | "InputLayer"
  | "LinearLayer"
  | "OutputLayer"
  | "ConvolutionalLayer";
export type LayerNode =
  | InputLayerNode
  | LinearLayerNode
  | OutputLayerNode
  | ConvolutionalLayerNode;

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
  ConvolutionalLayer: ConvolutionalLayerNodeComponent,
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
    type: "ConvolutionalLayer",
    label: "Convolutional Layer",
    description: "2D Convolutional layer for feature extraction",
  },
];

// 노드 타입 유효성 검사를 위한 헬퍼 함수
export function isValidNodeType(type: string): type is AvailableNodeTypes {
  return type in nodeTypes;
}
