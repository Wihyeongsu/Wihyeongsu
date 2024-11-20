import { Background, Controls, Panel, ReactFlow } from "@xyflow/react";
import Sidebar from "./Sidebar";

const FlowWithSidebar = () => {
  return (
    // 메인 플로우 영역
    <div className="flex-1">
      <Sidebar />
      <ReactFlow>
        {/* 패널 컴포넌트 */}
        <Panel position="top-left">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Flow Info</h3>
          </div>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowWithSidebar;
