import { Injectable } from '@angular/core';
import {Qubit} from '../Qubit';
import {Tensor} from '../Tensor';
import {Ket} from '../Ket';
import {Gate} from '../Gate';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class QubitService {

  qubitOne: Qubit;
  qubitTwo: Qubit;
  tensor: Tensor;

  message: string;
  entangled: boolean;
  gate: Gate;

  constructor() {
    this.qubitOne = new Qubit();
    this.qubitTwo = new Qubit();
    this.tensor = new Tensor(this.qubitOne, this.qubitTwo);
    this.entangled = false;
    this.gate = null;
    this.message = this.getStateMessage();
  }

  selectQubit(qubitNo: number): void {
    if (this.gate) {
      if (this.gate.matrix.length === 2 && qubitNo === 1) {
        this.qubitOne.applyGate(this.gate.matrix);
        this.tensor = new Tensor(this.qubitOne, this.qubitTwo);
      } else if (this.gate.matrix.length === 2 && qubitNo === 2) {
        this.qubitTwo.applyGate(this.gate.matrix);
        this.tensor = new Tensor(this.qubitOne, this.qubitTwo);
      }
      this.message = this.getStateMessage();
      this.gate = null;
    }
  }

  getMessage(): string {
    return this.message;
  }

  getQubit(qubitNo: number): Qubit {
    if (qubitNo === 1) {
      return this.qubitOne;
    } else {
      return this.qubitTwo;
    }
  }

  setGate(gate: Gate): void {
    this.gate = gate;
    if (gate.matrix.length === 2) {
      this.message = 'Select qubit to apply gate to...';
    } else if (gate.matrix.length === 4 && gate.name !== 'Swap') {
      this.message = 'Select control qubit...';
    }
  }

  getQubitRotation(qubitNo: number): number {
    const qubit = this.getQubit(qubitNo);
    const amp0 = (math.unequal(math.im(qubit.amp0), 0)) ? math.norm(qubit.amp0) : math.re(qubit.amp0);
    const amp1 = (math.unequal(math.im(qubit.amp1), 0)) ? math.norm(qubit.amp1) : math.re(qubit.amp1);
    return math.multiply(-1, math.multiply(math.atan2(amp1, amp0), math.divide(180, math.pi)));
  }

  getStateMessage(): string {
    let message = '';
    if (!this.entangled) {
      message += this.getQubitString(1) + '&emsp;&emsp;&emsp;' + this.getQubitString(2) + '<br>';
    }
    message += this.getTensorStateString();
    return message;
  }

  getQubitString(qubitNo: number): string {
    const qubit = this.getQubit(qubitNo);
    let qubitState = '';
    (qubitNo === 1) ? qubitState += Ket.KET_ALPHA : qubitState += Ket.KET_BETA;
    return qubitState + ' = ' + this.getStateString(qubit.amp0, Ket.KET_0) +
      this.getPlusSignString([qubit.amp0], qubit.amp1) +
      this.getStateString(qubit.amp1, Ket.KET_1);
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

  getPlusSignString(prevAmps: math.Complex[], currAmp): string {
    if (math.unequal(currAmp, 0)) {
      for (const amplitude of prevAmps) {
        if (math.unequal(amplitude, 0)) {
          return ' + ';
        }
      }
    }
    return '';
  }

  getTensorStateString(): string {
    return Ket.KET_ALPHA_BETA + ' = ' + this.getStateString(this.tensor.getRoundedAmp00(), Ket.KET_00) +
      this.getPlusSignString([this.tensor.getRoundedAmp00()], this.tensor.getRoundedAmp01()) +
      this.getStateString(this.tensor.getRoundedAmp01(), Ket.KET_01) +
      this.getPlusSignString([this.tensor.getRoundedAmp00(), this.tensor.getRoundedAmp01()], this.tensor.getRoundedAmp10()) +
      this.getStateString(this.tensor.getRoundedAmp10(), Ket.KET_10) +
      this.getPlusSignString([this.tensor.getRoundedAmp00(), this.tensor.getRoundedAmp01(), this.tensor.getRoundedAmp10()],
        this.tensor.getRoundedAmp11()) +
      this.getStateString(this.tensor.getRoundedAmp11(), Ket.KET_11);
  }
}
