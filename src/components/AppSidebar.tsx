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
import { GenerateCodeDialog } from "./GenerateCodeDialog";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { GithubSvg } from "./icons/github";
import { ReactSvg } from "./icons/react";
import { TauriSvg } from "./icons/tauri";
import { AiArchitectSvg } from "./icons/ai-architect";
import { TailwindSvg } from "./icons/tailwind";
import { ZustandSvg } from "./icons/zustand";
import { TypescriptSvg } from "./icons/typescript";
import { RustSvg } from "./icons/rust";

const bgStyle = { backgroundColor: "#737373" };

export function AppSidebar() {
  const reactFlowInstance = useReactFlow();

  return (
    // 외부 컨테이너에 상대적 위치 지정
    <div className="relative">
      {/* Sidebar를 왼쪽에 고정 */}
      <Sidebar
        style={bgStyle}
        className="max-w-[500px] border-r border-neutral-500 px-2.5 py-4 text-xs 
    peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] 
    md:peer-data-[variant=inset]:m-2 
    md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 
    md:peer-data-[variant=inset]:ml-0 
    md:peer-data-[variant=inset]:rounded-xl
    ">
        <div style={bgStyle}>
          <SidebarHeader
            className="
            text-xl font-bold text-slate-950
            rounded-xl bg-violet-50 border-2 border-violet-700 border-opacity-80
            mb-1 shadow-md pl-6
            ">
            {" _< : "}Hi there! 👋
          </SidebarHeader>
        </div>
        <div style={bgStyle} className="h-full">
          <SidebarContent className="bg-violet-50 rounded-xl border-2 border-violet-700 border-opacity-80 mb-1 shadow-md">
            <SidebarGroup>
              <SidebarGroupLabel
                className="
              text-lg font-semibold text-slate-950
              ">
                Nodes
              </SidebarGroupLabel>
              <Separator className="bg-violet-200 w-full mb-1" />
              <SidebarGroupContent>
                <SidebarMenu>
                  {nodeTypesSidebar.map((node, i) => (
                    <SidebarMenuItem
                      className="mb-1"
                      key={i}
                      onClick={() => {
                        createNodes(node.type, reactFlowInstance);
                        toast.success(`${node.type} has been created`);
                      }}>
                      <SidebarMenuButton
                        asChild
                        className="rounded-xl hover:bg-violet-200 justify-center 
                      trainstion-color duration-200
                      hover:ring-2 ring-violet-300
                      text-slate-950 font-semibold text-sm 
                      ">
                        <div>{node.label}</div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
        <div style={bgStyle}>
          <SidebarFooter className="rounded-xl flex flex-col gap-2">
            <GenerateCodeDialog />
            <div
              className="grid grid-cols-4 justify-around bg-neutral-400 p-2 rounded-xl 
            border-2 border-violet-700 border-opacity-80
            shadow-md">
              <ReactSvg />
              <TypescriptSvg />
              <TailwindSvg />
              <ZustandSvg />
              <RustSvg />
              <TauriSvg />
              <GithubSvg />
              <AiArchitectSvg />
            </div>
          </SidebarFooter>
        </div>
      </Sidebar>

      {/* Trigger를 Sidebar 바깥쪽에 위치 */}
      <div className="absolute -right-10 top-4 z-50">
        <SidebarTrigger
          className="
          bg-transparent
          rounded-full 
          hover:bg-violet-200 hover:bg-opacity-70
          transition-colors
          w-9 h-9
          "
        />
      </div>
    </div>
  );
}
