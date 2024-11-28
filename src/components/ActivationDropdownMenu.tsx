import { Activation, ActivationList } from "@/types/Activation.types";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

export const ActivationDropdownMenu = ({
  initialActivation,
}: {
  initialActivation: Activation;
}) => {
  const [activation, setActivation] = useState(
    initialActivation ? initialActivation : ActivationList[0],
  );

  return (
    <div>
      Activation
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-sm hover:bg-slate-400">
            {activation}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-zinc-50">
          <DropdownMenuLabel>Activation function</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ActivationList.map((act: Activation) => (
            <DropdownMenuItem
              key={act}
              className="focus:bg-slate-400 focus:text-white cursor-pointer data-[highlighted]:bg-slate-400 data-[highlighted]:text-white"
              onClick={() => setActivation(act)}>
              {act}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
