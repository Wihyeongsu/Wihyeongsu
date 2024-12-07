import { ReactFlowInstance } from "@xyflow/react";

const exportToJson = (reactFlowInstance: ReactFlowInstance) => {
  // 현재 그래프의 모든 노드와 엣지를 수집
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();

  // 그래프 데이터를 하나의 객체로 구성
  const graphData = {
    nodes: nodes,
    edges: edges,
    // 뷰포트 정보도 포함할 수 있습니다
    viewport: reactFlowInstance.getViewport(),
  };

  // JSON 문자열로 변환
  const jsonString = JSON.stringify(graphData, null, 2);

  // 예시: JSON 파일로 다운로드
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "flow-data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default exportToJson;
