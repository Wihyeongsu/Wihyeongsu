import { PaddingMode } from "@/types/Nodes/Convolutional2DLayerNode.types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type PaddingModeDropdownMenuProps = {
  currentPaddingMode: PaddingMode;
  setPaddingMode: (value: PaddingMode) => void;
  label: string;
};

export const PaddingModeDropdownMenu = ({
  currentPaddingMode,
  setPaddingMode,
  label,
}: PaddingModeDropdownMenuProps) => {
  const paddingModes = ["zeros", "reflect", "replicate", "circular"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-violet-200 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-violet-700 border-opacity-80 hover:bg-violet-200 text-slate-950 font-semibold">
          {label}: {currentPaddingMode}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-violet-50 rounded-xl border-2 border-violet-700 border-opacity-80 shadow-md">
        <DropdownMenuLabel className="text-slate-950 font-semibold text-xs">
          Padding mode
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-violet-200" />
        {paddingModes.map((mode) => (
          <DropdownMenuItem
            key={mode}
            className="focus:bg-violet-200 cursor-pointer data-[highlighted]:bg-violet-300 data-[highlighted]:text-slate-950 rounded-xl text-slate-950 font-semibold"
            onClick={() => setPaddingMode(mode as PaddingMode)}>
            {mode}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
