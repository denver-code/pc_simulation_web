"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Editor from "@/components/editor"
import Terminal from "@/components/terminal"
import Registers from "@/components/registers"
import MemoryAddresses from "@/components/memory-addresses"
import CPU from "@/lib/cpu"
export default function PCSimulator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [cpu] = useState(() => new CPU())

  const handleRun = () => {
    setOutput('');
    const lines = code.split('\n');
    let newOutput = '';
    let i = 0;
    while (i < lines.length) {
      let line = lines[i].trim();
      if (line === '' || line.startsWith(';')) {
        i++;
        continue;
      } 

      // remove comments
      if (line.includes(';')) {
        line = line.split(';')[0].trim();
      }

      if (line.startsWith('IF')) {
        const ifBlock = [];
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith('  ')) {
          ifBlock.push(lines[j].trim());
          j++;
        }
        const elseBlock = [];
        if (j < lines.length && lines[j].trim() === 'ELSE') {
          j++;
          while (j < lines.length && lines[j].startsWith('  ')) {
            elseBlock.push(lines[j].trim());
            j++;
          }
        }
        newOutput += executeIfStatement(cpu, line, ifBlock, elseBlock);
        i = j;
      } else {
        newOutput += cpu.execute(line);
        i++;
      }
    }
    setOutput(prevOutput => prevOutput + newOutput);
  }

  const executeIfStatement = (cpu: CPU, condition: string, ifBlock: string[], elseBlock: string[]) => {
    let output = cpu.execute(condition);
    const [leftOperand, operator, rightOperand] = cpu.parseCondition(condition.slice(3));
    const leftValue = cpu.parseImmediate(leftOperand);
    const rightValue = cpu.parseImmediate(rightOperand);
    const conditionMet = cpu.evaluateCondition(leftValue, operator, rightValue);

    if (conditionMet) {
      output += cpu.executeBlock(ifBlock);
    } else if (elseBlock.length > 0) {
      output += cpu.executeBlock(elseBlock);
    }

    return output;
  }

  return (
    <div className="min-h-screen bg-background p-4 grid gap-4" style={{
      gridTemplateColumns: "1fr 400px",
      gridTemplateRows: "auto auto 1fr auto",
      gridTemplateAreas: `
        "editor terminal"
        "editor registers"
        "editor memory"
        "editor search"
      `
    }}>
      <Card className="p-4" style={{ gridArea: "editor" }}>
        <h2 className="text-lg font-semibold mb-4">Editor</h2>
        <Editor code={code} setCode={setCode} />
        <Button onClick={handleRun} className="mt-4">Run</Button>
      </Card>

      <Card className="p-4" style={{ gridArea: "terminal" }}>
        <h2 className="text-lg font-semibold mb-4">Terminal</h2>
        <Terminal output={output} />
      </Card>

      <Card className="p-4" style={{ gridArea: "registers" }}>
        <h2 className="text-lg font-semibold mb-4">Registers</h2>
        <Registers registers={cpu.registers} />
      </Card>

      <Card className="p-4" style={{ gridArea: "memory" }}>
        <h2 className="text-lg font-semibold mb-4">Memory Addresses</h2>
        <MemoryAddresses memory={cpu.ram} />
      </Card>

      <div style={{ gridArea: "search" }}>
        <Input
          type="search"
          placeholder="Search..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}