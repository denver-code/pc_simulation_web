interface RegistersProps {
  registers: Uint8Array;
}

export default function Registers({ registers }: RegistersProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.from(registers).map((value, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-2 bg-muted rounded-md"
        >
          <span className="font-mono">R{index}</span>
          <span className="font-mono text-muted-foreground">{value.toString(2).padStart(8, '0')}</span>
        </div>
      ))}
    </div>
  )
}