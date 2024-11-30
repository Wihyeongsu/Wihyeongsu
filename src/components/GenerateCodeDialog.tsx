import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "./ui/toggle";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "./ui/separator";

export function GenerateCodeDialog({}) {
  const [apikey, setApikey] = useState("");
  const [show, setShow] = useState(false);

  // 다이얼로그의 열림/닫힘 상태를 관리합니다
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="bg-slate-100 hover:bg-slate-950 transition-colors duration-200">
        <Button variant="outline" className="rounded-xl active:text-slate-50">
          Generate code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-50">
        <DialogHeader>
          <DialogTitle>Api Key</DialogTitle>
          <Separator className="my-4 bg-slate-300" />
          <DialogDescription>
            Enter your Anthropic API key to generate code.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apikey" className="text-right">
              Api Key
            </Label>

            {/* Input과 Toggle을 감싸는 컨테이너 */}
            <div className="col-span-3 relative flex items-center">
              {/* Input 필드에 오른쪽 패딩을 추가하여 Toggle 버튼을 위한 공간 확보 */}
              <Input
                id="apikey"
                type={show ? "text" : "password"}
                value={apikey}
                onChange={(e) => setApikey(e.target.value)}
                className="pr-10 rounded-xl" // Toggle 버튼을 위한 여백
              />
              {/* Toggle 버튼을 Input 필드 안쪽 오른쪽에 배치 */}
              <Toggle
                aria-label="Show API key"
                onPressedChange={() => setShow(!show)}
                variant={show ? "outline" : "default"}
                className="absolute right-2 h-7 w-7 p-0 hover:bg-slate-100">
                {show ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Toggle>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="rounded-xl bg-slate-950 text-slate-50 hover:text-slate-950">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
