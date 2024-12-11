import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type BooleanDropdownMenuProps = {
  currentValue: boolean;
  setValue: (value: boolean) => void;
  label: string;
};

const BooleanDropdownMenu = ({
  currentValue,
  setValue,
  label,
}: BooleanDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-violet-200 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-violet-700 border-opacity-80 hover:bg-violet-200 text-slate-950 font-semibold">
          {label}: {currentValue.toString()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-violet-50 rounded-xl border-2 border-violet-700 border-opacity-80 shadow-md">
        <DropdownMenuLabel className="text-slate-950 font-semibold text-xs">
          Boolean value
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-violet-200" />
        {[true, false].map((value: boolean) => (
          <DropdownMenuItem
            key={value.toString()}
            className="focus:bg-violet-200 cursor-pointer data-[highlighted]:bg-violet-300 data-[highlighted]:text-slate-950 rounded-xl text-slate-950 font-semibold"
            onClick={() => setValue(value)}>
            {value.toString()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BooleanDropdownMenu;
