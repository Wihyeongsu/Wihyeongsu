import { PaddingMode } from "@/types/Nodes/ConvolutionalLayerNode.types";
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
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-gray-200 hover:border-slate-300">
          {label}: {currentPaddingMode}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-50 rounded-xl">
        <DropdownMenuLabel className="text-xs">Padding mode</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        {paddingModes.map((mode) => (
          <DropdownMenuItem
            key={mode}
            className="focus:bg-slate-100 cursor-pointer data-[highlighted]:bg-slate-400 data-[highlighted]:text-white rounded-xl"
            onClick={() => setPaddingMode(mode as PaddingMode)}>
            {mode}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
