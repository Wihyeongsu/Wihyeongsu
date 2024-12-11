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
        className="hover:bg-violet-200 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-violet-700 border-opacity-80 hover:bg-violet-200 text-slate-950 font-semibold">
          {label}: {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-violet-50 w-1/2 rounded-xl border-2 border-violet-700 border-opacity-80 shadow-md">
        <div className="max-w-full">
          <label htmlFor={"shape"} className="text-slate-950 font-semibold">
            {label}
          </label>
          <input
            id={"shape"}
            type="text"
            value={value}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              handleValueChange(e);
            }}
            className="no-spinner max-w-full bg-violet-100 rounded-lg text-slate-950"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NumericPopover;
