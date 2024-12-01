import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import Flow from "./components/Flow";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

function App() {
  return (
    <ReactFlowProvider>
      <SidebarProvider>
        <AppSidebar />
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
