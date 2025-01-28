class CPU {
  ram: Uint8Array;
  registers: Uint8Array;
  verbose: boolean;

  constructor() {
    this.ram = new Uint8Array(256);
    this.registers = new Uint8Array(8);
    this.verbose = false;
  }

  parseRegister(reg: string): number {
    const regNum = parseInt(reg.replace('R', ''), 10);
    if (isNaN(regNum) || regNum < 0 || regNum > 7) {
      throw new Error(`Invalid register: ${reg}`);
    }
    return regNum;
  }

  parseAddress(addr: string): number {
    const addrStr = addr.slice(1, -1);
    return this.parseImmediate(addrStr);
  }

  parseImmediate(value: string): number {
    if (value.startsWith('0b')) {
      return parseInt(value.slice(2), 2);
    } else if (value.startsWith('0x')) {
      return parseInt(value.slice(2), 16);
    } else if (value.startsWith('R')) {
      return this.registers[this.parseRegister(value)];
    } else if (value.startsWith('[') && value.endsWith(']')) {
      return this.ram[this.parseAddress(value)];
    } else {
      return parseInt(value, 10);
    }
  }

  executeBlock(lines: string[]): string {
    let output = '';
    for (const line of lines) {
      output += this.execute(line);
    }
    return output;
  }

  execute(instruction: string): string {
    const parts = instruction.split(';')[0].trim().split(/\s+/);
    if (parts.length === 0) return '';

    let output = '';
    const log = (msg: string) => {
      if (this.verbose) {
        output += msg + '\n';
        console.log(msg)
    };
    };

    try {
      switch (parts[0]) {
        case 'VER':
          {
            const verboseValue = this.parseImmediate(parts[2]);
            this.verbose = verboseValue === 1;
            log(`VER: VER = ${verboseValue} -> SET`);
          }
          break;
        case 'INIT':
          {
            const dest = parts[1];
            const value = this.parseImmediate(parts[3]); // Changed from parts[2] to parts[3]
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`INIT: Initialized R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`INIT: Initialized ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
          }
          break;
        case 'MOV':
          {
            const dest = parts[1];
            const source = parts[2];
            const value = this.parseImmediate(source);
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`MOV: Moved R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`MOV: Moved ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
          }
          break;
        case 'QMOV':
          {
            const dest = parts[1];
            const source = parts[2];
            const value = this.parseImmediate(source);
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`QMOV: Moved R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`QMOV: Moved ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
            // Clear the source register or memory address
            if (source.startsWith('R')) {
              const regIndex = this.parseRegister(source);
              this.registers[regIndex] = 0;
              log(`QMOV: Cleared R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(source);
              this.ram[address] = 0;
              log(`QMOV: Cleared ${address.toString(16).padStart(2, '0')} = ${this.ram[address].toString(2).padStart(8, '0')}`);
            }
          }
          break;
        case 'ADD':
          {
            const dest = parts[1];
            const source = parts[2];
            const value = this.parseImmediate(dest) + this.parseImmediate(source);
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`ADD: Added R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`ADD: Added ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
          }
          break;
        case 'SUB':
          {
            const dest = parts[1];
            const source = parts[2];
            const value = this.parseImmediate(dest) - this.parseImmediate(source);
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`SUB: Subtracted R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`SUB: Subtracted ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
          }
          break;
        case 'MUL':
          {
            const dest = parts[1];
            const source = parts[2];
            const value = this.parseImmediate(dest) * this.parseImmediate(source);
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`MUL: Multiplied R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`MUL: Multiplied ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
          }
          break;
        case 'DIV':
          {
            const dest = parts[1];
            const source = parts[2];
            const value = this.parseImmediate(dest) / this.parseImmediate(source);
            if (dest.startsWith('R')) {
              const regIndex = this.parseRegister(dest);
              this.registers[regIndex] = value;
              log(`DIV: Divided R${regIndex} = ${this.registers[regIndex].toString(2).padStart(8, '0')}`);
            } else {
              const address = this.parseAddress(dest);
              this.ram[address] = value;
              log(`DIV: Divided ${address.toString(16).padStart(2, '0')} = ${value.toString(2).padStart(8, '0')}`);
            }
          }
            break;         
        case 'OUT':
          {
            const dest = parts[1];
            const value = this.parseImmediate(dest);
            // log(`OUT: Output ${dest} = ${value.toString(2).padStart(8, '0')}`);

            // Output the value to the console
            output += `OUT: Output ${dest} = ${value.toString(2).padStart(8, '0')}`;
          }
          break;
        case 'IF':
          {
            const condition = parts.slice(1).join(' ');
            const [leftOperand, operator, rightOperand] = this.parseCondition(condition);
            const leftValue = this.parseImmediate(leftOperand);
            const rightValue = this.parseImmediate(rightOperand);

            const conditionMet = this.evaluateCondition(leftValue, operator, rightValue);

            if (this.verbose) {
              log(`IF condition: ${leftValue} ${operator} ${rightValue} -> ${conditionMet}`);
            }

            // The actual execution of the IF block will be handled in the main loop
            // that processes all instructions
          }
          break;
        case 'HALT':
          {
            const haltValue = parts.length > 1 ? this.parseImmediate(parts[1]) : 0;
            log(`HALT: HALT = ${haltValue} -> ${haltValue === 1 ? 'HALT' : 'RUN'}`);
            if (haltValue === 1) return output;
          }
          break;
        default:
          throw new Error(`Unknown instruction: ${parts[0]}`);
      }
    } catch (error) {
      log(`Error: ${(error as Error).message}`);
    }

    return output;
  }
  parseCondition(condition: string): [string, string, string] {
    const operators = ["==", "!=", ">", "<", ">=", "<="];
    for (const op of operators) {
      if (condition.includes(op)) {
        const [left, right] = condition.split(op);
        return [left.trim(), op, right.trim()];
      }
    }
    throw new Error(`Invalid condition: ${condition}`);
  }

  evaluateCondition(left: number, operator: string, right: number): boolean {
    switch (operator) {
      case "==": return left === right;
      case "!=": return left !== right;
      case ">": return left > right;
      case "<": return left < right;
      case ">=": return left >= right;
      case "<=": return left <= right;
      default: throw new Error(`Invalid operator: ${operator}`);
    }
  }
}

export default CPU;