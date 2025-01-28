"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
}

export default function Editor({ code, setCode }: EditorProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-mono min-h-[calc(100vh-8rem)] resize-none bg-background"
        placeholder="Enter your assembly code here..."
      />
    </ScrollArea>
  )
}