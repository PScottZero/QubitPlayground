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

  measure(): void {
    if (math.smaller(math.random(), math.pow(math.norm(this.amps[0]), 2))) {
      this.amps = [1, 0];
    } else {
      this.amps = [0, 1];
    }
  }
}
