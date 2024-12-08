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
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-gray-200 hover:border-slate-300">
          {label}: {currentValue.toString()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-50 rounded-xl">
        <DropdownMenuLabel className="text-xs">Boolean value</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        {[true, false].map((value: boolean) => (
          <DropdownMenuItem
            key={value.toString()}
            className="focus:bg-slate-100 focus:text-white cursor-pointer data-[highlighted]:bg-slate-400 data-[highlighted]:text-white rounded-xl"
            onClick={() => setValue(value)}>
            {value.toString()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BooleanDropdownMenu;
