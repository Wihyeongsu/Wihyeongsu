import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { LayerNode, nodeTypesSidebar } from "@/types/NodeTypes";
import { Button } from "./ui/Button";
import { useReactFlow } from "@xyflow/react";
import { create } from "domain";
import { createLinearLayerNode } from "@/types/LinearLayerNode.types";

// Rust 함수의 응답 타입을 정의합니다
type CustomResponse = {
  message: string;
  other_val: number;
};

// Sidebar 컴포넌트의 props 타입을 정의합니다
type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  // ReactFlow 인스턴스를 가져옵니다
  const reactFlowInstance = useReactFlow();
  // Rust API 응답을 위한 상태를 관리합니다
  const [response, setResponse] = useState<CustomResponse | null>(null);

  // 노드 생성을 처리하는 함수입니다
  const handleNodeCreation = (nodeType: string) => {
    // 현재 뷰포트의 정보를 가져옵니다
    const { x, y, zoom } = reactFlowInstance.getViewport();

    // 화면의 중앙 좌표를 계산합니다
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 뷰포트를 고려하여 노드의 위치를 계산합니다
    // zoom 레벨과 뷰포트의 현재 위치를 반영하여 정확한 위치를 계산합니다
    const position = {
      x: (centerX - x) / zoom,
      y: (centerY - y) / zoom,
    };

    // 새로운 노드를 생성합니다
    let newNode: LayerNode;
    switch (nodeType) {
      case "InputLayer":
        newNode = {
          id: `${nodeType}-${Date.now()}`,
          type: nodeType,
          position,
          data: { label: nodeType, shape: 1 },
        };
        break;
      case "LinearLayer":
        newNode = {
          id: `${nodeType}-${Date.now()}`,
          type: nodeType,
          position,
          data: { label: nodeType, nNodes: 1, activation: "none" },
        };
        break;
      case "OutputLayer":
        newNode = {
          id: `${nodeType}-${Date.now()}`,
          type: nodeType,
          position,
          data: { label: nodeType, shape: 1 },
        };
        break;
      default:
    }

    // ReactFlow 인스턴스를 통해 노드를 추가합니다
    reactFlowInstance.addNodes(newNode);
  };

  // Rust 함수를 호출하는 비동기 함수입니다
  const callRustFunction = async () => {
    try {
      const res = await invoke<CustomResponse>("my_custom_command", {
        name: "Wihyeongsu",
      });
      setResponse(res);
      console.log(`Message: ${res.message}, Other Val: ${res.other_val}`);
    } catch (e) {
      console.error("Error calling Rust function:", e);
    }
  };

  return (
    <aside className={`sidebar ${className || ""}`}>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>

      {/* 노드 타입 목록을 렌더링합니다 */}
      {nodeTypesSidebar.map((node) => (
        <Button key={node.type} onClick={() => handleNodeCreation(node.type)}>
          {node.label}
        </Button>
      ))}

      {/* Rust 함수 호출 버튼과 응답 표시 */}
      <Button
        variant="outline"
        color="primary"
        className="mt-5"
        onClick={callRustFunction}>
        Generate Code
      </Button>

      {response && (
        <div className="response-container mt-3">
          <p className="response-message">Message: {response.message}</p>
          <p className="response-value">Other Val: {response.other_val}</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
