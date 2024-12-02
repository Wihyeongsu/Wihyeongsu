import { useInput } from "@/hooks/useInput";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

type shapeType = "input" | "output";
const ShapePopover = ({
  initialShape,
  id,
  shapeType,
}: {
  initialShape: number;
  id: string;
  shapeType: shapeType;
}) => {
  const { updateNodeData, getNode, getEdges, setEdges } = useReactFlow();
  const [shape, onShapeChange] = useInput<number>(initialShape, (value) => {
    return value >= 0 && value < 10000;
  });

  useEffect(() => {
    // 노드의 데이터를 업데이트
    const updatedData = {
      [shapeType === "input" ? "inputShape" : "outputShape"]: shape,
    };
    updateNodeData(id, updatedData);

    // 현재 노드와 직접 연결된 edge들만 찾아서 검증
    const edges = getEdges();
    const updatedEdges = edges.filter((edge) => {
      // 현재 노드가 소스인 경우
      if (edge.source === id) {
        const targetNode = getNode(edge.target);
        // OutputLayer로 연결된 edge는 항상 유지
        if (targetNode?.type === "OutputLayer") return true;
        // 다른 노드로의 연결은 shape 일치 여부를 검사
        return shape === targetNode?.data.inputShape;
      }

      // 현재 노드가 타겟인 경우
      if (edge.target === id) {
        const sourceNode = getNode(edge.source);
        return sourceNode?.data.outputShape === shape;
      }

      return true;
    });

    // edge가 변경된 경우에만 업데이트
    if (edges.length !== updatedEdges.length) {
      setEdges(updatedEdges);
      console.debug(
        `Removed ${
          edges.length - updatedEdges.length
        } invalid edges for node ${id}`,
      );
    }
  }, [shape, id, shapeType, updateNodeData, getNode, getEdges, setEdges]);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border  border-gray-200 hover:border-slate-300">
          Shape: {shape}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-200 w-1/2 rounded-xl">
        <div className="max-w-full">
          <label htmlFor="output-shape">Output shape</label>
          <input
            id="output-shape"
            type="text"
            value={shape}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              onShapeChange(e);
            }}
            className=" no-spinner max-w-full bg-slate-200"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShapePopover;
