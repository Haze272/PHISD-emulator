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

  resetAll() {
    this.asm.setMemorySize(0);
  }
}
