import { Injectable } from '@angular/core';
import {Qubit} from '../Qubit';
import {TensorProduct} from '../TensorProduct';
import {Ket} from '../Ket';
import {Gate} from '../Gate';
import * as math from 'mathjs';
import {isBooleanLiteralLike} from 'codelyzer/util/utils';

@Injectable({
  providedIn: 'root'
})
export class QubitService {

  qubitOne: Qubit;
  qubitTwo: Qubit;
  tensor: TensorProduct;

  message: string;
  entangled: boolean;
  controlSelected: boolean;
  gate: Gate;

  constructor() {
    this.qubitOne = new Qubit();
    this.qubitTwo = new Qubit();
    this.tensor = new TensorProduct(this.qubitOne, this.qubitTwo);
    this.entangled = false;
    this.gate = null;
    this.message = this.getStateMessage();
  }

  selectQubit(qubitNo: number): void {
    if (this.gate) {
      if (this.gate.matrix.length === 2 && qubitNo === 1) {
        this.qubitOne.applyGate(this.gate.matrix);
        this.tensor = new TensorProduct(this.qubitOne, this.qubitTwo);
      } else if (this.gate.matrix.length === 2 && qubitNo === 2) {
        this.qubitTwo.applyGate(this.gate.matrix);
        this.tensor = new TensorProduct(this.qubitOne, this.qubitTwo);
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
    const angle = -math.atan(qubit.amp1 / qubit.amp0) * 180 / math.pi;
    if (qubit.amp0 < 0 && qubit.amp1 > 0 || qubit.amp0 < 0 && qubit.amp1 < 0 || qubit.getRoundedAmp0() === -1) {
      return angle - 180;
    }
    return angle;
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
    if (qubitNo === 1) {
      qubitState += Ket.KET_ALPHA;
    } else {
      qubitState += Ket.KET_BETA;
    }
    return qubitState + ' = ' + this.getStateString(qubit.getRoundedAmp0(), Ket.KET_0) +
      this.getPlusSignString(qubit.getRoundedAmp0(), qubit.getRoundedAmp1()) +
      this.getStateString(qubit.getRoundedAmp1(), Ket.KET_1);
  }

  getStateString(amplitude: math.Complex, ket: Ket): string {
    if (amplitude === 1) {
      return ket;
    } else if (amplitude === -1) {
      return '-' + ket;
    } else if (amplitude !== 0) {
      return amplitude + ket;
    }
    return '';
  }

  getPlusSignString(amplitude1: math.Complex, amplitude2: math.Complex): string {
    if (amplitude1 !== 0 && amplitude2 !== 0) {
      return ' + ';
    }
    return '';
  }

  getTensorStateString(): string {
    return Ket.KET_ALPHA_BETA + ' = ' + this.tensor.amp00.toFixed(2) + Ket.KET_00 + ' + ' + this.tensor.amp01.toFixed(2) + Ket.KET_01 +
      ' + ' + this.tensor.amp10.toFixed(2) + Ket.KET_10 + ' + ' + this.tensor.amp11.toFixed(2) + Ket.KET_11;
  }
}
