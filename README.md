# PC Simulation
Based on [this Rust project of mine](https://github.com/denver-code/pc_simulation_rs)

Basic web app that will simulate some of the flows on computer, including: 
- RAM  (`256 bytes`) - can be read, written and dumped for inspection.    
  
  Addressed via hexadecimal addressed. 

  Each memory cell is 8 bits (1 byte) wide
- CPU - 8-bit CPU with 8 general-purpose registers.
  ATM asm-like code directly executed by the CPU, I'm not sure how it supposed to be.   

  CPU supports `8 general-purpose 8-bit` registers to hold data during execution.  
- More on the way, but it's still area for a research.  

Simulation has option to write simple assembly-like programs with small set of instructions:  
- `VER` - Toggle verbosity to enable/disable detailed execution logs.
- `MOV QMOV` - Assingning RAM/Another Register's/Immediate Value to the register or memory.
- `INIT` - Initialize memory addresses with values.
- `ADD SUB MUL DIV` -  basic arythemitcs
- `OUT` - Output register or memory/values.
- `CLEAR` - Clear the register or memory
- `HALT` - Stop the execution.
- `IF/ELSE` -  If and else statement that supports basic operations between registers, memory and values.

Read docs on the website for more information and examples.

## Getting Started
```bash
git clone https://github.com/denver-code/pc_simulation_web
cd pc_simulation_web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.