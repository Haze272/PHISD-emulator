import {Component, inject} from '@angular/core';
import {HarvardDualOperandService} from '../harvard-dual-operand.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-harvard-dual-operand-page',
  imports: [
    FormsModule
  ],
  templateUrl: './harvard-dual-operand-page.component.html',
  styleUrl: './harvard-dual-operand-page.component.scss'
})
export class HarvardDualOperandPageComponent {
  asm = inject(HarvardDualOperandService);

  loadData(inputData: string) {
    const data: number[] = inputData.split(',').map(el => {
      return parseInt(el);
    });

    this.asm.loadData(data);
  }

  loadInstructions(inputInstructions: string) {
    const instructions: string[] = inputInstructions.split(/\r?\n|\r|\n/g);

    this.asm.loadInstructions(instructions);
  }

  launch() {
    this.asm.execute();
  }

  launchInterval() {

  }

  launchOneInstruction() {

  }

  resetRegisters() {
    this.asm.loadInstructions([
      'RESET ACC',
      'RESET R1',
      'RESET R2',
      'RESET TMP'
    ]);
    this.asm.execute();
    this.asm.loadInstructions([]);
  }

  resetMemory() {
    this.asm.loadData(new Array( this.asm.getMemory().length).fill(0));
  }

  resetInstructions() {
    this.asm.loadInstructions([]);
  }

  resetAll() {
    this.resetRegisters();
    this.resetInstructions();
    this.resetMemory();
  }
}
