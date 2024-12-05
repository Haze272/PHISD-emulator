import {Injectable} from '@angular/core';

export type Instruction = {
  code: string;
  state: 'none' | 'actual' | 'passed' | 'error';
};

@Injectable({
  providedIn: 'root'
})
export class HarvardDualOperandService {
  private memoryData: number[] = [];
  // private memoryInstructions: string[] = [];
  private instructions: Instruction[] = [];
  private registers: { [key: string]: number } = {ACC: 0, R1: 0, R2: 0, TMP: 0};

  setMemorySize(memorySize: number) {
    this.memoryData = new Array(memorySize).fill(0);
  }

  get memorySize() {
    return this.memoryData.length;
  }

  getInstructions() {
    return this.instructions;
  }

  getRegisters() {
    return this.registers;
  }

  loadData(data: number[]) {
    this.memoryData.splice(0, data.length, ...data);
  }

  loadInstructions(instructions: string[]) {
    this.instructions = instructions.map(el => ({code: el, state: 'none'}));
  }

  execute() {
    for (const instruction of this.instructions) {
      instruction.state = 'actual';
      const [op, arg1, arg2] = instruction.code.split(" ");
      switch (op) {
        case "LOAD":
          this.registers[arg1] = this.memoryData[parseInt(arg2)];
          instruction.state = 'passed';
          break;
        case "ADD":
          this.registers[arg1] += this.registers[arg2];
          instruction.state = 'passed';
          break;
        case "MUL":
          this.registers[arg1] *= this.registers[arg2];
          instruction.state = 'passed';
          break;
        case "STORE":
          this.memoryData[parseInt(arg2)] = this.registers[arg1];
          instruction.state = 'passed';
          break;
        case "RESET":
          this.registers[arg1] = 0;
          instruction.state = 'passed';
          break;
        default:
          instruction.state = 'error';
          throw new Error(`Неизвестная инструкция: ${op}`);
      }
    }
  }

  executeOne() {
    const instruction = this.instructions.find(el => el.state === 'none');
    if (instruction) {
      instruction.state = 'actual';

      const [op, arg1, arg2] = instruction.code.split(" ");
      switch (op) {
        case "LOAD":
          this.registers[arg1] = this.memoryData[parseInt(arg2)];
          instruction.state = 'passed';
          break;
        case "ADD":
          this.registers[arg1] += this.registers[arg2];
          instruction.state = 'passed';
          break;
        case "MUL":
          this.registers[arg1] *= this.registers[arg2];
          instruction.state = 'passed';
          break;
        case "STORE":
          this.memoryData[parseInt(arg2)] = this.registers[arg1];
          instruction.state = 'passed';
          break;
        case "RESET":
          this.registers[arg1] = 0;
          instruction.state = 'passed';
          break;
        default:
          instruction.state = 'error';
          throw new Error(`Неизвестная инструкция: ${op}`);
      }
    }
  }

  getMemory(): number[] {
    return [...this.memoryData];
  }

  getRegisterValue(register: string): number {
    return this.registers[register];
  }
}
