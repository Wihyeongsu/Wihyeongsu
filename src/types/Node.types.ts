// 노드의 데이터 타입 정의
export type CustomNodeData = {
  label: string;
};

export type NodeData = {
  // Customize NodeData
  color: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type NodeProps = {
  data: NodeData;
  isConnectable: boolean;
};
