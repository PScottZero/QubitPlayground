import * as math from 'mathjs';
import {Gate} from './Gate';

export class Qubit {
  amps: math.Complex[];

  constructor(amplitudes: math.Complex[]) {
    this.amps = amplitudes;
  }

  applyGate(gate: Gate): void {
    this.amps = math.multiply(gate.matrix, this.amps);
  }
}
