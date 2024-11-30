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
import { createNodes } from "@/utils/createNodes";
import { useState } from "react";
import { fetchAnthropicResponse } from "@/utils/fetchAnthropic";
import { GenerateCodeDialog } from "./GenerateCodeDialog";

export function AppSidebar() {
  // ReactFlow 인스턴스를 가져옵니다
  const reactFlowInstance = useReactFlow();

  // Rust API 응답을 위한 상태를 관리합니다
  const [response, setResponse] = useState<string[] | null>(null);
  const [prompt, _] = useState<string>("Explanation of Rust in English");

  return (
    <Sidebar className=" max-w-250px border-r border-[#eeeeee] px-2.5 py-4 text-xs bg-[#fcfcfc]">
      <SidebarHeader className="mb-2">
        {response && <div className="mt-3">{response}</div>}
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
        {/* <SidebarMenuButton
          variant="outline"
          color="primary"
          className="mt-5"
          onClick={() => fetchAnthropicResponse(prompt, setResponse)}>
          Generate Code
        </SidebarMenuButton> */}
        <GenerateCodeDialog />
      </SidebarFooter>
    </Sidebar>
  );
}
