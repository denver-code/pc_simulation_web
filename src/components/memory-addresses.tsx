"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MemoryAddressesProps {
  memory: Uint8Array;
}

export default function MemoryAddresses({ memory }: MemoryAddressesProps) {
  const renderMemoryGrid = (addresses: number[]) => (
    <div className="grid grid-cols-4 gap-2">
      {addresses.map((index) => (
        <div
          key={index}
          className="flex flex-col items-center p-2 bg-muted rounded-md"
        >
          <span className="font-mono text-xs text-muted-foreground">
            0x{index.toString(16).padStart(2, '0').toUpperCase()}
          </span>
          <span className="font-mono text-sm">{memory[index].toString(2).padStart(8, '0')}</span>
        </div>
      ))}
    </div>
  );

  const allAddresses = Array.from(memory.keys());
  const nonZeroAddresses = allAddresses.filter(index => memory[index] !== 0);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all">All Addresses</TabsTrigger>
        <TabsTrigger value="nonzero">Non-Zero</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ScrollArea className="h-[calc(100vh-750px)]">
          {renderMemoryGrid(allAddresses)}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="nonzero">
        <ScrollArea className="h-[calc(100vh-750px)]">
          {nonZeroAddresses.length > 0 ? (
            renderMemoryGrid(nonZeroAddresses)
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No non-zero memory addresses
            </div>
          )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}