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
import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";

export const ActivationDropdownMenu = ({
  initialActivation,
  id,
}: {
  initialActivation: Activation;
  id: string;
}) => {
  const [activation, setActivation] = useState(
    initialActivation ? initialActivation : ActivationList[0],
  );
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    updateNodeData(id, { Activation: activation });
  }, [activation]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border  border-gray-200 hover:border-slate-300">
          {activation}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-50 rounded-xl">
        <DropdownMenuLabel className="text-xs">
          Activation function
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        {ActivationList.map((act: Activation) => (
          <DropdownMenuItem
            key={act}
            className="focus:bg-slate-100 focus:text-white cursor-pointer data-[highlighted]:bg-slate-400 data-[highlighted]:text-white rounded-xl"
            onClick={() => setActivation(act)}>
            {act}
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
