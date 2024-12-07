import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";

const PaddingTypes = ["valid", "same"] as const;
type PaddingType = (typeof PaddingTypes)[number];

export const PaddingDropdownMenu = ({
  initialPadding,
  id,
}: {
  initialPadding: PaddingType;
  id: string;
}) => {
  const [padding, setPadding] = useState<PaddingType>(
    initialPadding || PaddingTypes[0],
  );
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    updateNodeData(id, { padding });
  }, [padding, id, updateNodeData]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-slate-100 rounded-xl h-4 text-xs">
        <Button
          variant="ghost"
          className="border border-gray-200 hover:border-slate-300">
          {padding}
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
