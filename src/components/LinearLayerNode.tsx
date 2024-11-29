import { LinearLayerNodeProps } from "@/types/LinearLayerNode.types";
import { Handle, Position } from "@xyflow/react";

import { ActivationDropdownMenu } from "./ActivationDropdownMenu";
import ShapePopover from "./ShapePopover";

const LinearLayerNodeComponent = ({
  id,
  data,
  isConnectable,
}: LinearLayerNodeProps) => {
  return (
    <div>
      <div>Linear</div>
      <div>
        Input shape:
        <ShapePopover initialShape={data.inputShape} id={id} type="input" />
      </div>

      <div>
        Output shape:
        <ShapePopover initialShape={data.outputShape} id={id} type="output" />
      </div>

      <div>
        Activation:
        <ActivationDropdownMenu initialActivation={data.activation} id={id} />
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default LinearLayerNodeComponent;
