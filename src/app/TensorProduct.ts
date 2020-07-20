import * as math from 'mathjs';
import {Qubit} from './Qubit';

export class TensorProduct {
  amp00: math.Complex;
  amp01: math.Complex;
  amp10: math.Complex;
  amp11: math.Complex;

  constructor(qubitOne: Qubit, qubitTwo: Qubit) {
    this.setTensor(qubitOne, qubitTwo);
  }

  setTensor(qubitOne: Qubit, qubitTwo: Qubit): void {
    this.amp00 = qubitOne.amp0 * qubitTwo.amp0;
    this.amp01 = qubitOne.amp0 * qubitTwo.amp1;
    this.amp10 = qubitOne.amp1 * qubitTwo.amp0;
    this.amp11 = qubitOne.amp1 * qubitTwo.amp1;
  }

  getRoundedAmp00(): math.Complex {
    return +(this.amp00.toFixed(2));
  }

  getRoundedAmp01(): math.Complex {
    return +(this.amp01.toFixed(2));
  }

  getRoundedAmp10(): math.Complex {
    return +(this.amp10.toFixed(2));
  }

  getRoundedAmp11(): math.Complex {
    return +(this.amp11.toFixed(2));
  }
}
