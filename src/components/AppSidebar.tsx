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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { nodeTypesSidebar } from "@/types/Nodes.types";
import { useReactFlow } from "@xyflow/react";
import { createNodes } from "@/utils/createNodes";
import { useState } from "react";
import { GenerateCodeDialog } from "./GenerateCodeDialog";

export function AppSidebar() {
  const reactFlowInstance = useReactFlow();
  const [response] = useState<string[] | null>(null);

  return (
    // 외부 컨테이너에 상대적 위치 지정을 추가합니다
    <div className="relative bg-[#00062E32]">
      {/* Sidebar를 왼쪽에 고정합니다 */}
      <Sidebar className="max-w-[250px] border-r border-[#eeeeee] px-2.5 py-4 text-xs bg-[#fcfcfc]">
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
          <GenerateCodeDialog />
        </SidebarFooter>
      </Sidebar>

      {/* Trigger를 Sidebar 바깥쪽에 위치시킵니다 */}
      <div className="absolute -right-9 top-4 z-50">
        <SidebarTrigger className="bg-transparent rounded-full hover:bg-gray-100 transition-colors" />
      </div>
    </div>
  );
}
