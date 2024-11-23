import React from "react";
import { useDnD } from "./DnDContext";
import { nodeTypesSidebar } from "@/types/NodeTypes";

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

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
    </aside>
  );
};
