import { Injectable } from '@angular/core';
import {Ket} from '../classes/Ket';
import {Tensor} from '../classes/Tensor';
import {Gate} from '../classes/Gate';
import * as math from 'mathjs';
import {Qubit} from '../classes/Qubit';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string;

  constructor() { }

  getMessage(): string {
    return this.message;
  }

  setSelectControlQubitMessage(gate: Gate): void {
    this.message = 'Select control qubit for ' + gate.name + ' gate...';
  }

  setSelectQubitMessage(gate: Gate): void {
    this.message = 'Select qubit to apply ' + gate.name + ' gate to...';
  }

  setQubitMessage(qubit: Qubit): void {
    this.message = Ket.KET_ALPHA + ' = ' + this.getStateString(qubit.amps[0], Ket.KET_0) +
      this.getPlusString([qubit.amps[0]], qubit.amps[1]) +
      this.getStateString(qubit.amps[1], Ket.KET_1);
  }

  setTensorMessage(tensor: Tensor): void {
    this.message =  Ket.KET_ALPHA_BETA + ' = ' + this.getStateString(tensor.amps[0], Ket.KET_00) +
      this.getPlusString([tensor.amps[0]], tensor.amps[1]) +
      this.getStateString(tensor.amps[1], Ket.KET_01) +
      this.getPlusString([tensor.amps[0], tensor.amps[1]], tensor.amps[2]) +
      this.getStateString(tensor.amps[2], Ket.KET_10) +
      this.getPlusString([tensor.amps[0], tensor.amps[1], tensor.amps[2]],
        tensor.amps[3]) +
      this.getStateString(tensor.amps[3], Ket.KET_11);
  }

  getStateString(amplitude: math.Complex, ket: Ket): string {
    if (math.equal(amplitude, 1)) {
      return ket;
    } else if (math.equal(amplitude, -1)) {
      return '-' + ket;
    } else if (math.unequal(amplitude, 0)) {
      return math.round(amplitude, 2) + ket;
    }
    return '';
  }

  getPlusString(prevAmps: math.Complex[], currAmp): string {
    if (math.unequal(currAmp, 0)) {
      for (const amplitude of prevAmps) {
        if (math.unequal(amplitude, 0)) {
          return ' + ';
        }
      }
    }
    return '';
  }
}
