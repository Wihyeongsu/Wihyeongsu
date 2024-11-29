import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { nodeTypesSidebar } from "@/types/Nodes.types";
import { useReactFlow } from "@xyflow/react";
import { createNodes } from "@/createNodes";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

// Rust 함수의 응답 타입을 정의합니다
type CustomResponse = {
  message: string;
  other_val: number;
};

export function AppSidebar() {
  // ReactFlow 인스턴스를 가져옵니다
  const reactFlowInstance = useReactFlow();

  // Rust API 응답을 위한 상태를 관리합니다
  const [response, setResponse] = useState<CustomResponse | null>(null);

  // Rust 함수를 호출하는 비동기 함수입니다
  const callRustFunction = async () => {
    try {
      const res = await invoke<CustomResponse>("my_custom_command", {
        name: "Wihyeongsu",
      });
      setResponse(res);
      console.log(`Message: ${res.message}, Other Val: ${res.other_val}`);
    } catch (e) {
      console.error("Error calling Rust function:", e);
    }
  };

  return (
    <Sidebar className=" max-w-250px border-r border-[#eeeeee] px-2.5 py-4 text-xs bg-[#fcfcfc]">
      <SidebarHeader className="mb-2">
        {response && (
          <div className="mt-3">
            <p className="">Message: {response.message}</p>
            <p className="">Other Val: {response.other_val}</p>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nodes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nodeTypesSidebar.map((node, i) => (
                <SidebarMenuItem
                  key={i}
                  onClick={() => createNodes(node.type, reactFlowInstance)}>
                  <SidebarMenuButton asChild>
                    <div>{node.label}</div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          variant="outline"
          color="primary"
          className="mt-5"
          onClick={callRustFunction}>
          Generate Code
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
