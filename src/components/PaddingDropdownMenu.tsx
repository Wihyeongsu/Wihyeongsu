import { PaddingType } from "@/types/Nodes/Convolutional2DLayerNode.types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { isNumberNArray } from "@/utils/isNumberNArray";

type PaddingDropdownMenuProps = {
  currentPadding: PaddingType;
  setPadding: (value: [number, number] | "valid" | "same") => void;
  label: string;
};

export const PaddingDropdownMenu = ({
  currentPadding,
  setPadding,
  label,
}: PaddingDropdownMenuProps) => {
  const PaddingTypes = ["[number, number]", "valid", "same"];

  const handlePaddingChange = (type: string) => {
    switch (type) {
      case "valid":
        setPadding("valid");
        break;
      case "same":
        setPadding("same");
        break;
      case "[number, number]":
        // 기본값으로 [1, 1]을 사용하거나, 현재 값을 유지할 수 있습니다
        const defaultPadding: [number, number] = isNumberNArray(
          currentPadding,
          2,
        )
          ? currentPadding
          : [1, 1];
        setPadding(defaultPadding);
        break;
      default:
        console.warn(`Unexpected padding type: ${type}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-gray-200 hover:border-slate-300">
          {label}:{" "}
          {isNumberNArray(currentPadding, 2)
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
            onClick={() => handlePaddingChange(type)}>
            {type}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
