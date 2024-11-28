import { InputLayerNodeProps } from "@/types/InputLayerNode.types";
import { Handle, Position } from "@xyflow/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useInput } from "@/hooks/useInput";

const InputLayerNodeComponent = ({
  data,
  isConnectable,
}: InputLayerNodeProps) => {
  // const [shape, setShape] = useState<number>(data.shape);
  const [shape, onShapeChange] = useInput<number>(data.shape, (value) => {
    return value >= 0 && value < 10000;
  });

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>

      <Popover>
        <PopoverTrigger asChild className="hover:bg-slate-100">
          <Button variant="outline">Shape: {shape}</Button>
        </PopoverTrigger>
        <PopoverContent className="bg-[#eeeeee] w-1/2">
          <div className="max-w-full">
            <label htmlFor="input-shape">Shape</label>
            <input
              id="input-shape"
              type="text"
              value={shape}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                onShapeChange(e);
              }}
              className=" no-spinner max-w-full bg-[#eeeeee]"
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default InputLayerNodeComponent;
