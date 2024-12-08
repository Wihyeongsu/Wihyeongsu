import { PaddingType } from "@/types/Nodes/ConvolutionalLayerNode.types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { isNumberTuple } from "@/utils/isNumberTuple";

type PaddingDropdownMenuProps = {
  currentPadding: PaddingType;
  setPadding: (value: string) => void;
  label?: string;
};

export const PaddingDropdownMenu = ({
  currentPadding,
  setPadding,
  label,
}: PaddingDropdownMenuProps) => {
  const PaddingTypes = ["[Vertical, Horizontal]", "valid", "same"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-gray-200 hover:border-slate-300">
          {label}:{" "}
          {isNumberTuple(currentPadding)
            ? `[${currentPadding.join(", ")}]`
            : currentPadding}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-50 rounded-xl">
        <DropdownMenuLabel className="text-xs">Padding type</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        {PaddingTypes.map((type) => (
          <DropdownMenuItem
            key={type}
            className="focus:bg-slate-100 cursor-pointer data-[highlighted]:bg-slate-400 data-[highlighted]:text-white rounded-xl"
            onClick={() => setPadding(type)}>
            {type}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
