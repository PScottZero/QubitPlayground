import * as math from 'mathjs';

export class Qubit {
  amp0: math.Complex;
  amp1: math.Complex;

  constructor() {
    this.amp0 = 1;
    this.amp1 = 0;
  }

  applyGate(matrix: math.Complex[][]): void {
    const tmp = matrix[0][0] * this.amp0 + matrix[0][1] * this.amp1;
    this.amp1 = matrix[1][0] * this.amp0 + matrix[1][1] * this.amp1;
    this.amp0 = tmp;
  }

  getRoundedAmp0(): math.Complex {
    return +(this.amp0.toFixed(2));
  }

  getRoundedAmp1(): math.Complex {
    return +(this.amp1.toFixed(2));
  }
}

