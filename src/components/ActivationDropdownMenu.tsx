import { Activation, ActivationList } from "@/types/Activation.types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type ActivationDropdownMenuProps = {
  currentActivation: Activation;
  setActivation: (value: Activation) => void;
  label: string;
};

export const ActivationDropdownMenu = ({
  currentActivation,
  setActivation,
  label,
}: ActivationDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-violet-200 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-violet-700 border-opacity-80 hover:bg-violet-200 text-slate-950 font-semibold">
          {label}: {currentActivation}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-violet-50 rounded-xl border-2 border-violet-700 border-opacity-80 shadow-md">
        <DropdownMenuLabel className="text-slate-950 font-semibold text-xs">
          Activation function
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-violet-200" />
        {ActivationList.map((act: Activation) => (
          <DropdownMenuItem
            key={act}
            className="focus:bg-violet-200 cursor-pointer data-[highlighted]:bg-violet-300 data-[highlighted]:text-slate-950 rounded-xl text-slate-950 font-semibold"
            onClick={() => setActivation(act)}>
            {act}
            <DropdownMenuShortcut className="text-slate-950">
              ⇧⌘P
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
