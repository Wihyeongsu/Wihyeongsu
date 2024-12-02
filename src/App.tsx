import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import Flow from "./components/Flow";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Toaster } from "./components/ui/sonner";

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
        <Toaster className="bg-slate-150" />
      </SidebarProvider>
    </ReactFlowProvider>
  );
}

export default App;
