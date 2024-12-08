import { useInput } from "@/hooks/useInput";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

type NumericPopoverProps = {
  initialValue: number;
  label: string;
  setValue: (value: number) => void;
};

const NumericPopover = ({
  initialValue,
  label,
  setValue,
}: NumericPopoverProps) => {
  // const {  getNode, getEdges, setEdges } = useReactFlow();

  const defaultValidator = (value: number) => value >= 0 && value <= 10000;
  const [value, handleValueChange] = useInput<number>(
    initialValue,
    defaultValidator,
  );

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs ">
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
