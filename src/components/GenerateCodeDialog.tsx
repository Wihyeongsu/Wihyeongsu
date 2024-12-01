import { useState } from "react";
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
import AnimatedSubmitButton from "./AnimatedSubmitButton";
import ClimbingBoxLoader from "./ClimbingBoxLoader";

const buttonStyle =
  "rounded-xl bg-slate-80 border-2 border-slate-50 text-slate-950 hover:bg-slate-50 hover:border-slate-950 active:bg-slate-950 active:text-slate-50 transition-color duration-200 shadow-sm";

export function GenerateCodeDialog({}) {
  const [apikey, setApikey] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-slate-100">
        <Button variant="ghost" className={buttonStyle}>
          Generate code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-50 sm:rounded-2xl">
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
                className="
                pr-10 
                rounded-xl 
                border-none
                focus:ring-2
              focus:ring-slate-700 
              focus:border-slate-700 
              transition-all
              duration-150"
              />
              <Toggle
                aria-label="Show API key"
                onPressedChange={() => setShow(!show)}
                className="absolute right-2 h-7 w-7 p-0 hover:bg-slate-100">
                {show ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Toggle>

              <ClimbingBoxLoader />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {/* <Button variant="ghost" className={buttonStyle}>
            Next
          </Button> */}

          <AnimatedSubmitButton />
        </div>
      </DialogContent>
    </Dialog>
  );
}
