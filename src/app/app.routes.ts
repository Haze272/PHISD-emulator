import { Routes } from '@angular/router';
import {EmulatorPageComponent} from './features/emulator/emulator-page/emulator-page.component';
import {
  HarvardDualOperandPageComponent
} from './features/emulator/harvard-dual-operand/harvard-dual-operand-page/harvard-dual-operand-page.component';

export const routes: Routes = [
  {
    path: '',
    component: EmulatorPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'harvard',
    children: [
      {
        path: 'dual-operand',
        component: HarvardDualOperandPageComponent
      }
    ]
  }
];
