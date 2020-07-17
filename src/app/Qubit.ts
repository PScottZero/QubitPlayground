import * as math from 'mathjs';

export class Qubit {
  zeroAmp: math.Complex;
  oneAmp: math.Complex;

  constructor() {
    this.zeroAmp = 1;
    this.oneAmp = 0;
  }

  setZeroAmp(zeroAmp: math.Complex): void {
    this.zeroAmp = zeroAmp;
    this.oneAmp = math.sqrt(1 - math.pow(zeroAmp, 2));
  }

  setOneAmp(oneAmp: math.Complex): void {
    this.oneAmp = oneAmp;
    this.zeroAmp = math.sqrt(1 - math.pow(oneAmp, 2));
  }
}
