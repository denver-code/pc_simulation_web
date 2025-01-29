import { ScrollArea } from "@/components/ui/scroll-area"

export default function Documentation() {
  return (
    <ScrollArea className="h-[calc(100vh-10rem)] p-4">
      <h2 className="text-2xl font-bold mb-4">CPU Instructions Documentation</h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">VER</h3>
      <p>Toggle verbosity (0 or 1)</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`VER = 1
VER = 0`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">INIT</h3>
      <p>Initialize a register or memory address</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`INIT R0 = 42
INIT [0x10] = 0b10101010
INIT [0x20] = 0xFF`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">MOV</h3>
      <p>Move a value to a register or memory address</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`MOV R0, 42
MOV [0x10], R1
MOV R2, [0x20]`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">QMOV</h3>
      <p>Move a value and clear the source</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`QMOV R0, R1
QMOV [0x10], R2
QMOV R3, [0x30]`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">ADD</h3>
      <p>Add two values</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`ADD R0, R1
ADD R2, 10
ADD [0x10], R3`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">SUB</h3>
      <p>Subtract two values</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`SUB R0, R1
SUB R2, 5
SUB [0x10], R3`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">MUL</h3>
      <p>Multiply two values</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`MUL R0, R1
MUL R2, 3
MUL [0x10], R3`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">DIV</h3>
      <p>Divide two values</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`DIV R0, R1
DIV R2, 2
DIV [0x10], R3`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">OUT</h3>
      <p>Output a value</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`OUT R0
OUT [0x10]
OUT 42`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">IF</h3>
      <p>Conditional statement</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`IF R0 == 0
  MOV R1, 42
ELSE
  MOV R1, 24

IF R2 > [0x10]
  ADD R3, 5
  OUT R3`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">CLR</h3>
      <p>Clear a register or memory address</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`CLR R0
CLR [0x10]`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">HALT</h3>
      <p>Halt the program (0 or 1)</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`HALT 1
HALT 0`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-6 mb-2">Sample Program</h3>
      <p>Here's a sample program that demonstrates the use of multiple instructions:</p>
      <pre className="bg-muted p-2 rounded mt-2">
        <code>{`VER = 1                 ; Enable verbosity
INIT [0x0A] = 5         ; Initialize memory address 0x0A to 5
MOV R1, [0x0A]          ; Move the value from memory address 0x0A to register R1

IF R1 == 5              ; Check if the value in R1 is 5
  OUT 1                 ; Output 1
ELSE
  OUT 0                 ; Output 0

CLR R1                  ; Clear register R1
CLR [0x0A]              ; Clear memory address 0x0A
VER = 0                 ; Disable verbosity`}</code>
      </pre>
    </ScrollArea>
  )
}

