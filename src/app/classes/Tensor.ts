import * as math from 'mathjs';
import {Gate} from './Gate';

export class Tensor {
  amps: math.Complex[];

  constructor(amplitudes: math.Complex[]) {
    this.amps = amplitudes;
  }

  isEntangled(): boolean {
    return math.unequal(
      math.subtract(
        math.multiply(this.amps[0], this.amps[3]),
        math.multiply(this.amps[1], this.amps[2])
      ), 0);
  }

  applyGate(gate: Gate, qubitNo: number): math.Complex[] {
    this.amps = math.multiply(gate.modifyGate(qubitNo), this.amps);
    if (!this.isEntangled()) {
      return this.decompose();
    }
    return null;
  }

  decompose(): math.Complex[] {
    let alpha = this.getProbability(this.amps[2], this.amps[0]);
    if (math.isNaN(alpha)) {
      alpha = this.getProbability(this.amps[3], this.amps[1]);
    }
    let beta = this.getProbability(this.amps[1], this.amps[0]);
    if (math.isNaN(beta)) {
      beta = this.getProbability(this.amps[3], this.amps[2]);
    }
    return [alpha, beta];
  }

  getProbability(amp0: math.Complex, amp1: math.Complex): math.Complex {
    return math.divide(
      math.pow(amp0, 2),
      math.add(
        math.pow(amp0, 2),
        math.pow(amp1, 2)
      )
    );
  }
}
