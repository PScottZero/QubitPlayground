import * as math from 'mathjs';

export class Gate {
  name: string;
  matrix: math.Complex[][];

  constructor(name: string, matrix: math.Complex[][]) {
    this.name = name;
    this.matrix = matrix;
  }
}
