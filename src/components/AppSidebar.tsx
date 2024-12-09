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
import { nodeTypesSidebar } from "@/types/Nodes/Nodes.types";
import { useReactFlow } from "@xyflow/react";
import { createNodes } from "@/utils/createNodes";
import { useState } from "react";
import { GenerateCodeDialog } from "./GenerateCodeDialog";
import { toast } from "sonner";
import { Button } from "./ui/button";
import exportToJson from "@/utils/exportFlowToJson";

export function AppSidebar() {
  const reactFlowInstance = useReactFlow();
  const [response] = useState<string[] | null>(null);

  return (
    // 외부 컨테이너에 상대적 위치 지정
    <div className="relative bg-[#00062E32]">
      {/* Sidebar를 왼쪽에 고정 */}
      <Sidebar className="max-w-[500px] border-r border-slate-50 px-2.5 py-4 text-xs bg-[#fcfcfc]">
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
                    className="font-semibold"
                    key={i}
                    onClick={() => {
                      createNodes(node.type, reactFlowInstance);
                      toast.success(`${node.type} has been created`, {
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                      });
                    }}>
                    <SidebarMenuButton
                      asChild
                      className="rounded-xl hover:bg-slate-200 justify-center">
                      <div>{node.label}</div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="ghost"
            onClick={() => {
              exportToJson(reactFlowInstance);
              toast.success("Flow data has been exported to JSON");
            }}
            className="
            rounded-xl bg-slate-80 border-2 
            border-slate-50 text-slate-950 
            hover:bg-slate-50 hover:border-slate-950 
            active:bg-slate-950 active:text-slate-50 
            transition-color duration-200 
            shadow-sm">
            Download
          </Button>
          <GenerateCodeDialog />
        </SidebarFooter>
      </Sidebar>

      {/* Trigger를 Sidebar 바깥쪽에 위치 */}
      <div className="absolute -right-10 top-4 z-50">
        <SidebarTrigger
          className="
          bg-transparent
          rounded-full 
          hover:bg-gray-100 
          transition-colors
          w-9 h-9
          "
        />
      </div>
    </div>
  );
}
