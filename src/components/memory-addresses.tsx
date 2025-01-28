"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

interface MemoryAddressesProps {
  memory: Uint8Array;
}

export default function MemoryAddresses({ memory }: MemoryAddressesProps) {
  return (
    <ScrollArea className="h-[calc(100vh-600px)]">
      <div className="grid grid-cols-4 gap-2">
        {Array.from(memory).map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 bg-muted rounded-md"
          >
            <span className="font-mono text-xs text-muted-foreground">
              0x{index.toString(16).padStart(2, '0').toUpperCase()}
            </span>
            <span className="font-mono text-sm">{value.toString(2).padStart(8, '0')}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}