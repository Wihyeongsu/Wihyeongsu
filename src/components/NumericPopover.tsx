import { useInput } from "@/hooks/useInput";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

type NumericPopoverProps = {
  initialValue: number;
  id: string;
  label: string;
  setValue: (value: number) => void;
};

const NumericPopover = ({
  initialValue,
  id,
  label,
  setValue,
}: NumericPopoverProps) => {
  // const {  getNode, getEdges, setEdges } = useReactFlow();

  const defaultValidator = (value: number) => value >= 1 && value <= 10000;
  const [value, handleValueChange] = useInput<number>(
    initialValue,
    defaultValidator,
  );

  useEffect(() => {
    setValue?.(value);
  }, [value, initialValue, id, setValue]);

  // useEffect(() => {
  //   const updatedData = {
  //     // [fieldName]: value,
  //   };
  //   updateNodeData(id, updatedData);

  //   // Shape 검증이 필요한 경우에만 실행
  //   if (fieldName === "inputShape" || fieldName === "outputShape") {
  //     const edges = getEdges();
  //     const updatedEdges = edges.filter((edge) => {
  //       if (edge.source === id) {
  //         const targetNode = getNode(edge.target);
  //         if (targetNode?.type === "OutputLayer") return true;
  //         return value === targetNode?.data.inputShape;
  //       }
  //       if (edge.target === id) {
  //         const sourceNode = getNode(edge.source);
  //         return sourceNode?.data.outputShape === value;
  //       }
  //       return true;
  //     });

  //     if (edges.length !== updatedEdges.length) {
  //       setEdges(updatedEdges);
  //     }
  //   }
  // }, [value, id, updateNodeData, getNode, getEdges, setEdges]);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-gray-200 hover:border-slate-300">
          {label}: {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-200 w-1/2 rounded-xl">
        <div className="max-w-full">
          <label htmlFor={"shape"}>{label}</label>
          <input
            id={"shape"}
            type="text"
            value={value}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              handleValueChange(e);
            }}
            className="no-spinner max-w-full bg-slate-200"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NumericPopover;
