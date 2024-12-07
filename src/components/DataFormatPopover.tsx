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
  currentFormat: DataFormat;
  updateField: "inputShape" | "outputShape";
  setDataFormat?: (format: DataFormat) => void;
};

export const DataFormatPopover = ({
  currentFormat,
  setDataFormat,
}: DataFormatPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 gap-2 text-xs hover:bg-slate-100">
          <FontAwesomeIcon icon={faArrowsRotate} className="h-3 w-3" />
          {currentFormat}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-200 rounded-xl">
        <div className="flex flex-col gap-1">
          {[
            { label: "1D", description: "N" },
            { label: "2D", description: "H, W, C" },
          ].map((format) => (
            <Button
              key={format.label}
              variant={currentFormat === format.label ? "secondary" : "ghost"}
              onClick={() => {
                setDataFormat(format.label as DataFormat);
              }}
              className="w-full justify-between text-xs hover:bg-slate-100">
              <span>{format.label}</span>
              <span className="text-xs text-muted-foreground">
                [{format.description}]
              </span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
