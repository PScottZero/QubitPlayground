import { Component, OnInit } from '@angular/core';
import {Qubit} from '../../Qubit';

const QUBIT_COUNT = 16;

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  qubits: Qubit[];

  constructor() {}

  ngOnInit(): void {
    this.qubits = [];
    for (let i = 0; i < QUBIT_COUNT; i++) {
      this.qubits.push(new Qubit());
    }
  }

  rotateImage(qubit: Qubit): number {
    console.log(Math.pow(qubit.oneAmp, 2) * 180);
    return -Math.pow(qubit.oneAmp, 2) * 180;
  }
}
