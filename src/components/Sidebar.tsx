import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useDnD } from "./DnDContext";
import { nodeTypesSidebar } from "@/types/NodeTypes";
import { Button } from "./ui/Button";

type CustomResponse = {
  message: string;
  other_val: number;
};

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // 응답을 저장할 상태 추가
  const [response, setResponse] = useState<CustomResponse | null>(null);
  // 컴포넌트가 마운트될 때 Rust 함수 호출
  useEffect(() => {
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

    callRustFunction();
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {nodeTypesSidebar.map((node) => (
        <div
          key={node.type}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable>
          {node.label}
        </div>
      ))}
      <Button variant="outline" color="primary" style={{ marginTop: "20px" }}>
        Generate Code {response?.message}
      </Button>
    </aside>
  );
};
