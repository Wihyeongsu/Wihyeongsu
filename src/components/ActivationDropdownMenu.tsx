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
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm hover:bg-slate-100">
          {activation}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-50">
        <DropdownMenuLabel>Activation function</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ActivationList.map((act: Activation) => (
          <DropdownMenuItem
            key={act}
            className="focus:bg-slate-100 focus:text-white cursor-pointer data-[highlighted]:bg-slate-400 data-[highlighted]:text-white"
            onClick={() => setActivation(act)}>
            {act}
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};