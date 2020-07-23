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

  qubits: Qubit[];
  tensor: Tensor;

  message: string;
  gate: Gate;
  entangled: boolean;
  selectionEnabled: boolean;

  constructor() {
    this.qubits = [new Qubit(), new Qubit()];
    this.tensor = new Tensor(this.qubits[0], this.qubits[1]);
    this.entangled = false;
    this.selectionEnabled = false;
    this.gate = null;
    this.message = this.getStateMessage();
  }

  selectQubit(qubitNo: number): void {
    if (this.gate) {
      if (this.gate.matrix.length === 2) {
        this.qubits[qubitNo].applyGate(this.gate.matrix);
        this.tensor.setTensor(this.qubits[0], this.qubits[1]);
      }
      this.message = this.getStateMessage();
      this.selectionEnabled = false;
      this.gate = null;
    }
  }

  getMessage(): string {
    return this.message;
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
    const qubit = this.qubits[qubitNo];
    const amp0 = (math.unequal(math.im(qubit.amp0), 0)) ? math.norm(qubit.amp0) : math.re(qubit.amp0);
    const amp1 = (math.unequal(math.im(qubit.amp1), 0)) ? math.norm(qubit.amp1) : math.re(qubit.amp1);
    return math.multiply(-1, math.multiply(math.atan2(amp1, amp0), math.divide(180, math.pi)));
  }

  getStateMessage(): string {
    let message = '';
    if (!this.entangled) {
      message += this.getQubitString(0) + '&emsp;&emsp;&emsp;' + this.getQubitString(1) + '<br>';
    }
    message += this.getTensorProductString();
    return message;
  }

  getQubitString(qubitNo: number): string {
    const qubit = this.qubits[qubitNo];
    const qubitName = (qubitNo === 0) ? Ket.KET_ALPHA : Ket.KET_BETA;
    return qubitName + ' = ' + this.getStateString(qubit.amp0, Ket.KET_0) +
      this.getPlusString([qubit.amp0], qubit.amp1) +
      this.getStateString(qubit.amp1, Ket.KET_1);
  }

  getTensorProductString(): string {
    return Ket.KET_ALPHA_BETA + ' = ' + this.getStateString(this.tensor.getAmp00(), Ket.KET_00) +
      this.getPlusString([this.tensor.getAmp00()], this.tensor.getAmp01()) +
      this.getStateString(this.tensor.getAmp01(), Ket.KET_01) +
      this.getPlusString([this.tensor.getAmp00(), this.tensor.getAmp01()], this.tensor.getAmp10()) +
      this.getStateString(this.tensor.getAmp10(), Ket.KET_10) +
      this.getPlusString([this.tensor.getAmp00(), this.tensor.getAmp01(), this.tensor.getAmp10()],
        this.tensor.getAmp11()) +
      this.getStateString(this.tensor.getAmp11(), Ket.KET_11);
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
