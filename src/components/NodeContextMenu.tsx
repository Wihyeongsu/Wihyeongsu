import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

import { ReactNode } from "react";

type NodeContextMenuProps = {
  children: ReactNode;
  id: string;
};

const NodeContextMenu = ({ children, id }: NodeContextMenuProps) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    if (!node) return;
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id),
    );
  }, [id, setNodes, setEdges]);

  const ContextMenuItems = [
    {
      label: "Duplicate",
      action: duplicateNode,
    },
    {
      label: "Delete",
      action: deleteNode,
    },
  ];

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-1/4 bg-violet-50 border-2 border-violet-700 border-opacity-80 shadow-md rounded-xl">
        <div className="text-center text-slate-950 font-semibold">
          Context-Menu
        </div>
        <ContextMenuSeparator className="bg-violet-200" />
        {ContextMenuItems.map((item, i) => (
          <ContextMenuItem
            inset
            key={i}
            onClick={item.action}
            className="data-[highlighted]:bg-violet-300 data-[highlighted]:text-slate-950 text-slate-950 font-semibold hover:bg-violet-200 rounded-lg">
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default NodeContextMenu;
