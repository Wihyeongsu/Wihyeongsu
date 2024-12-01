import { useInput } from "@/hooks/useInput";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import { HandleType, useReactFlow } from "@xyflow/react";

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
  const [Shape, onShapeChange] = useInput<number>(initialShape, (value) => {
    return value >= 0 && value < 10000;
  });

  useEffect(() => {
    let updatedData = {};
    let updatedHandleType: HandleType;
    switch (shapeType) {
      case "input":
        updatedData = { inputShape: Shape };
        updatedHandleType = "target";
        break;
      case "output":
        updatedData = { outputShape: Shape };
        updatedHandleType = "source";
        break;
      default:
        break;
    }

    updateNodeData(id, updatedData);

    setEdges(
      getEdges().filter((edge) => {
        getNode(edge.source).data.outputShape ===
          getNode(edge.target).data.inputShape;
      }),
    );
  }, [Shape]);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border  border-gray-200 hover:border-slate-300">
          Shape: {Shape}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-200 w-1/2 rounded-xl">
        <div className="max-w-full">
          <label htmlFor="output-shape">Output shape</label>
          <input
            id="output-shape"
            type="text"
            value={Shape}
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
