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
  children: any;
};

export const PaddingDropdownMenu = ({
  currentPadding,
  setPadding,
  label,
  children,
}: PaddingDropdownMenuProps) => {
  const PaddingTypes = ["[number, number]", "valid", "same"];

  const handlePaddingChange = (type: string) => {
    switch (type) {
      case "valid":
      case "same":
        setPadding(type);
        break;
      default:
        // 기본값으로 [1, 1]을 사용하거나, 현재 값을 유지할 수 있습니다
        const defaultPadding: [number, number] = isNumberNArray(
          currentPadding,
          2,
        )
          ? currentPadding
          : [1, 1];
        setPadding(defaultPadding);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-violet-200 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-violet-700 border-opacity-80 hover:bg-violet-200 text-slate-950 font-semibold">
          {label}:{children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-violet-50 rounded-xl border-2 border-violet-700 border-opacity-80 shadow-md">
        <DropdownMenuLabel className="text-slate-950 font-semibold text-xs">
          Padding type
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-violet-200" />
        {PaddingTypes.map((type) => (
          <DropdownMenuItem
            key={type}
            className="focus:bg-violet-200 cursor-pointer data-[highlighted]:bg-violet-300 data-[highlighted]:text-slate-950 rounded-xl text-slate-950 font-semibold"
            onClick={() => handlePaddingChange(type)}>
            {type}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
