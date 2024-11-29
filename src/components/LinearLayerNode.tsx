import { LinearLayerNodeProps } from "@/types/LinearLayerNode.types";
import { Handle, Position } from "@xyflow/react";

import { ActivationDropdownMenu } from "./ActivationDropdownMenu";
import ShapePopover from "./ShapePopover";
import NodeContextMenu from "./NodeContextMenu";

const LinearLayerNodeComponent = ({
  id,
  data,
  isConnectable,
}: LinearLayerNodeProps) => {
  return (
    <NodeContextMenu id={id}>
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
    </NodeContextMenu>
  );
};

export default LinearLayerNodeComponent;
