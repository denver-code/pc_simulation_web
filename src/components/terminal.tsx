"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

interface TerminalProps {
  output: string;
}

export default function Terminal({ output }: TerminalProps) {
  return (
    <ScrollArea className="h-[200px]">
      <div className="font-mono text-sm whitespace-pre">
        {output || "> BIOS v1.0"}
      </div>
    </ScrollArea>
  )
}