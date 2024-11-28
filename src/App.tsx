import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import CustomNodeFlow from "./components/CustomNodesFlow";
import Flow from "./components/Flow";
import Sidebar from "./components/Sidebar";
import { Demo } from "./components/test";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

function App() {
  return (
    <ReactFlowProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="bg-red-700" />
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}>
          <Flow />
        </div>
      </SidebarProvider>
    </ReactFlowProvider>
  );
}

export default App;
