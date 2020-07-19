import { Component, OnInit } from '@angular/core';
import {Qubit} from '../../Qubit';

const QUBIT_COUNT = 2;

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  qubitOne: Qubit;
  qubitTwo: Qubit;

  constructor() {}

  ngOnInit(): void {
    this.qubitOne = new Qubit();
    this.qubitTwo = new Qubit();
  }

  rotateQubit(qubit: Qubit): number {
    return -Math.pow(qubit.oneAmp, 2) * 180;
  }
}
