import { useInput } from "@/hooks/useInput";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

const NumberPopover = ({
  initialValue,
  id,
  fieldName,
  label,
  min = 0,
  max = 10000,
}: {
  initialValue: number;
  id: string;
  fieldName: string;
  label: string;
  min?: number;
  max?: number;
}) => {
  const { updateNodeData } = useReactFlow();
  const [value, onValueChange] = useInput<number>(initialValue, (value) => {
    return value >= min && value <= max;
  });

  useEffect(() => {
    const updatedData = {
      [fieldName]: value,
    };
    updateNodeData(id, updatedData);
  }, [value, id, fieldName, updateNodeData]);

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
          <label htmlFor={fieldName}>{label}</label>
          <input
            id={fieldName}
            type="text"
            value={value}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              onValueChange(e);
            }}
            className="no-spinner max-w-full bg-slate-200"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NumberPopover;
