import * as math from 'mathjs';

export class Qubit {
  amp0: math.Complex;
  amp1: math.Complex;

  constructor() {
    this.amp0 = 1;
    this.amp1 = 0;
  }

  applyGate(matrix: math.Complex[][]): void {
    const tmp = math.add(math.multiply(matrix[0][0], this.amp0), math.multiply(matrix[0][1], this.amp1));
    this.amp1 = math.add(math.multiply(matrix[1][0], this.amp0), math.multiply(matrix[1][1], this.amp1));
    this.amp0 = tmp;
  }
}

