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
} from "./ui/DropdownMenu";
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
          <Button variant="outline" className="text-sm">
            {activation}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Activation function</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ActivationList.map((act: Activation) => (
            <DropdownMenuItem
              key={act}
              className="hover:bg-gray-50"
              onClick={() => {
                setActivation(act);
              }}>
              <span>{act}</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
