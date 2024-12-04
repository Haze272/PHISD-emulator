import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HarvardDualOperandService {
  private memoryData: number[] = [];
  private memoryInstructions: string[] = [];
  private registers: { [key: string]: number } = { ACC: 0, R1: 0, R2: 0, TMP: 0 };

  setMemorySize(memorySize: number) {
    this.memoryData = new Array(memorySize).fill(0);
  }

  get memorySize() {
    return this.memoryData.length;
  }

  getInstructions() {
    return this.memoryInstructions;
  }

  getRegisters() {
    return this.registers;
  }

  loadData(data: number[]) {
    this.memoryData = [...data];
  }


  loadInstructions(instructions: string[]) {
    this.memoryInstructions = [...instructions];
  }

  execute() {
    for (const instruction of this.memoryInstructions) {
      const [op, arg1, arg2] = instruction.split(" ");
      switch (op) {
        case "LOAD":
          this.registers[arg1] = this.memoryData[parseInt(arg2)];
          break;
        case "ADD":
          this.registers[arg1] += this.registers[arg2];
          break;
        case "MUL":
          this.registers[arg1] *= this.registers[arg2];
          break;
        case "STORE":
          this.memoryData[parseInt(arg2)] = this.registers[arg1];
          break;
        case "RESET":
          this.registers[arg1] = 0;
          break;
        default:
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
