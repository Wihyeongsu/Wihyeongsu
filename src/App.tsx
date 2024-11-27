import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import CustomNodeFlow from "./components/CustomNodesFlow";
import Flow from "./components/Flow";
import Sidebar from "./components/Sidebar";
import { Demo } from "./components/test";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
      {/* <CustomNodeFlow /> */}
    </div>
  );
}

export default App;
