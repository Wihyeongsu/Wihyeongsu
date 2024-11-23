import { DenseLayerNodeProps } from "@/types/DenseLayerNode.types";
import { Handle, Position } from "@xyflow/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { StepperInput } from "./ui/stepper-input";

const DenseLayerNode = ({ data, isConnectable }: DenseLayerNodeProps) => {
  return (
    <div className="DenseLayer">
      {/* 입력 핸들 정의 */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div>
        <div>{data.label}</div>
        {/* <div>
          <label htmlFor="inputShape">Input Shape:</label>
          <input type="number" id="inputShape" />
        </div>
        <div>
          <label htmlFor="outputShape">Output Shape:</label>
          <input type="number" id="outputShape" />
        </div> */}
        {/* <NumberInputRoot
          // defaultValue={data.nNodes ? data.nNodes.toString() : "1"}
          min={1}
          borderColor="blue.500" // 테두리 색상
          bg="gray" // 배경색
          borderRadius="md" // 모서리 둥글기
          size={"xs"}
          width={"50px"}
          height={"50px"}
          required={true}>
          <NumberInputField placeholder="Nodes" />
        </NumberInputRoot> */}

        <div>Activation: {data.activation}</div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default DenseLayerNode;
