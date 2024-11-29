import { useInput } from "@/hooks/useInput";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

type shapeType = "input" | "output";
const ShapePopover = ({
  initialShape,
  id,
  type,
}: {
  initialShape: number;
  id: string;
  type: shapeType;
}) => {
  const { updateNodeData } = useReactFlow();

  const [Shape, onShapeChange] = useInput<number>(initialShape, (value) => {
    return value >= 0 && value < 10000;
  });

  useEffect(() => {
    let updatedData = {};
    switch (type) {
      case "input":
        updatedData = { inputShape: Shape };
        break;
      case "output":
        updatedData = { outputShape: Shape };
        break;
      default:
        break;
    }
    updateNodeData(id, updatedData);
  }, [Shape]);

  return (
    <Popover>
      <PopoverTrigger asChild className="hover:bg-slate-100 ">
        <Button
          variant="ghost"
          className="border  border-gray-200 hover:border-gray-300 hover:rounded-2xl">
          Shape: {Shape}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-[#eeeeee] w-1/2">
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
            className=" no-spinner max-w-full bg-[#eeeeee]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShapePopover;
