import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { LayerNode, nodeTypesSidebar } from "@/types/Nodes.types";
import { Button } from "./ui/Button";
import { useReactFlow } from "@xyflow/react";
import { createNodes } from "@/createNodes";

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
        <Button
          key={node.type}
          onClick={() => createNodes(node.type, reactFlowInstance)}>
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
