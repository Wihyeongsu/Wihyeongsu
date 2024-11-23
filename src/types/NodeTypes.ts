import DenseLayerNode from "../components/DenseLayerNode";
import { InputNode } from "../components/InputNode";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
export const nodeTypes = {
  Input: InputNode,
  DenseLayer: DenseLayerNode,
};

export const nodeTypesSidebar = [
  { type: "Input", label: "Input Node" },
  { type: "DenseLayer", label: "Dense Layer" },
];
