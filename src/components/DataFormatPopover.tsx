import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataFormat, formatInfo } from "@/types/DataFormat.types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";

type DataFormatPopoverProps = {
  id: string;
  currentFormat: DataFormat;
  shape: number[];
  updateField: "inputShape" | "outputShape";
};

export const DataFormatPopover = ({
  id,
  currentFormat,
  shape,
  updateField,
}: DataFormatPopoverProps) => {
  const { updateNodeData } = useReactFlow();

  const handleFormatChange = (newFormat: DataFormat) => {
    const newShape = formatInfo[newFormat].convert(shape);
    updateNodeData(id, {
      dataFormat: newFormat,
      [updateField]: newShape,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 gap-2 text-xs hover:bg-slate-100">
          <FontAwesomeIcon icon={faArrowsRotate} className="h-3 w-3" />
          {formatInfo[currentFormat].label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="flex flex-col gap-1">
          {Object.entries(formatInfo).map(([format, info]) => (
            <Button
              key={format}
              variant={currentFormat === format ? "secondary" : "ghost"}
              onClick={() => handleFormatChange(format as DataFormat)}
              className="w-full justify-between text-xs hover:bg-slate-100">
              <span>{info.label}</span>
              <span className="text-xs text-muted-foreground">
                {info.description}
              </span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
