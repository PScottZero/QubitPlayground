import * as math from 'mathjs';
import { Gate } from './Gate';

const OUTCOME_MAP = new Map([
  [
    0,
    new Map([
      [true, [2, 3]],
      [false, [0, 1]],
    ]),
  ],
  [
    1,
    new Map([
      [true, [1, 3]],
      [false, [0, 2]],
    ]),
  ],
]);

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
      ),
      0
    );
  }

  applyGate(gate: Gate, qubitNo: number): math.Complex[] {
    this.amps = math.multiply(gate.modifyGate(qubitNo), this.amps);
    if (!this.isEntangled()) {
      return this.decompose();
    }
    return null;
  }

  decompose(): math.Complex[] {
    return [
      math.add(math.pow(this.amps[2], 2), math.pow(this.amps[3], 2)),
      math.add(math.pow(this.amps[1], 2), math.pow(this.amps[3], 2)),
    ];
  }

  measure(qubitNo: number): math.Complex[] {
    const indices = OUTCOME_MAP.get(qubitNo).get(
      math.smaller(math.random(), this.decompose()[qubitNo])
    );
    const norm = math.sqrt(
      math.add(
        math.pow(this.amps[indices[0]], 2),
        math.pow(this.amps[indices[1]], 2)
      )
    );
    const newAmps = [];
    for (let i = 0; i < this.amps.length; i++) {
      indices.includes(i)
        ? newAmps.push(math.divide(this.amps[i], norm))
        : newAmps.push(0);
    }
    this.amps = newAmps;
    return this.decompose();
  }
}
