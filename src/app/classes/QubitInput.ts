import * as math from 'mathjs';

export class QubitInput {
  ket: string;
  value: math.Complex;
  valid: boolean;

  constructor(ket: string, value: math.Complex, valid: boolean) {
    this.ket = ket;
    this.value = value;
    this.valid = valid;
  }
}
