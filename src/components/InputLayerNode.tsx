import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import ShapePopover from "./ShapePopover";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { useCallback } from "react";

const InputLayerNodeComponent = ({
  id,
  data,
  isConnectable,
}: InputLayerNodeProps) => {
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
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
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
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Input</div>
          <ShapePopover
            initialShape={data.outputShape}
            id={id}
            type={"output"}
          />

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

          <Handle
            type="source"
            position={Position.Right}
            onConnect={(params) => console.log("handle onConnect", params)}
            isConnectable={isConnectable}
            className="w-16 !bg-teal-500"
          />
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
};

export default InputLayerNodeComponent;
