import * as math from 'mathjs';
import {Qubit} from './Qubit';

export class Tensor {
  amp00: math.Complex[];
  amp01: math.Complex[];
  amp10: math.Complex[];
  amp11: math.Complex[];

  constructor(qubitOne: Qubit, qubitTwo: Qubit) {
    this.setTensor(qubitOne, qubitTwo);
  }

  setTensor(qubitOne: Qubit, qubitTwo: Qubit): void {
    this.amp00 = [qubitOne.amp0, qubitTwo.amp0];
    this.amp01 = [qubitOne.amp0, qubitTwo.amp1];
    this.amp10 = [qubitOne.amp1, qubitTwo.amp0];
    this.amp11 = [qubitOne.amp1, qubitTwo.amp1];
  }

  getRoundedAmp00(): math.Complex {
    return math.round(math.multiply(this.amp00[0], this.amp00[1]), 2);
  }

  getRoundedAmp01(): math.Complex {
    return math.round(math.multiply(this.amp01[0], this.amp01[1]), 2);
  }

  getRoundedAmp10(): math.Complex {
    return math.round(math.multiply(this.amp10[0], this.amp10[1]), 2);
  }

  getRoundedAmp11(): math.Complex {
    return math.round(math.multiply(this.amp11[0], this.amp11[1]), 2);
  }
}
