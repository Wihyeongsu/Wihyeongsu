import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const NodeContextMenu = ({ children, id }) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
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
      <ContextMenuContent className="w-1/4 bg-slate-100">
        <div className="text-center">Context-Menu</div>
        <ContextMenuSeparator />
        {ContextMenuItems.map((item, i) => (
          <ContextMenuItem
            inset
            key={i}
            onClick={item.action}
            className="data-[highlighted]:bg-slate-400 data-[highlighted]:text-white">
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default NodeContextMenu;
