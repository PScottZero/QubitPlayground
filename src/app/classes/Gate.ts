import * as math from 'mathjs';

const SWAP_R2_R3 = [
  [1, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1]
];

const IDENTITY_2X2 = [
  [1, 0],
  [0, 1]
];

export class Gate {
  name: string;
  matrix: math.Complex[][];

  constructor(name: string, matrix: math.Complex[][]) {
    this.name = name;
    this.matrix = matrix;
  }

  modifyGate(qubitNo: number): math.Complex[][] {
    if (this.matrix.length === 2) {
      if (qubitNo === 0) {
        return this.tensorProduct(this.matrix, IDENTITY_2X2);
      } else {
        return this.tensorProduct(IDENTITY_2X2, this.matrix);
      }
    } else {
      if (qubitNo === 1) {
        return math.multiply(SWAP_R2_R3, this.matrix, SWAP_R2_R3);
      } else {
        return this.matrix;
      }
    }
  }

  tensorProduct(mat0: math.Complex[][], mat1: math.Complex[][]): math.Complex[][] {
    const prod = Array<math.Complex>(mat0.length * mat1.length)
      .fill(Array<math.Complex>(mat0[0].length * mat1[0].length).fill(0));
    return prod.map((row: math.Complex[], r: number) => {
      return row.map((col: math.Complex[], c: number) => {
        return math.multiply(
          mat0[math.floor(r / mat0.length)][math.floor(c / mat0[0].length)],
          mat1[r % mat1.length][c % mat1[0].length]
        );
      });
    });
  }
}

export const gateList = [
  new Gate('X',
    [
      [0, 1],
      [1, 0]
    ]
  ),
  new Gate('Y',
    [
      [0, math.multiply(-1, math.i)],
      [math.i, 0]
    ]
  ),
  new Gate('Z',
    [
      [1, 0],
      [0, -1]
    ]
  ),
  new Gate('Hadamard',
    [
      [math.divide(1, math.sqrt(2)), math.divide(1, math.sqrt(2))],
      [math.divide(1, math.sqrt(2)), math.divide(-1, math.sqrt(2))]
    ]
  ),
  new Gate('Phase',
    [
      [1, 0],
      [0, math.i]
    ]
  ),
  new Gate('T',
    [
      [1, 0],
      [0, math.exp(math.multiply(math.i, math.divide(math.pi, 4)))]
    ]
  ),
  new Gate('CNOT',
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]
  ),
  new Gate('CZ',
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, -1]
    ]
  ),
  new Gate('Swap',
    [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    ]
  ),
  new Gate('QFT',
    [
      [math.divide(1, 2), math.divide(1, 2), math.divide(1, 2), math.divide(1, 2)],
      [math.divide(1, 2), math.divide(math.i, 2), math.divide(-1, 2), math.divide(math.multiply(-1, math.i), 2)],
      [math.divide(1, 2), math.divide(-1, 2), math.divide(1, 2), math.divide(-1, 2)],
      [math.divide(1, 2), math.divide(math.multiply(-1, math.i), 2), math.divide(-1, 2), math.divide(math.i, 2)]
    ]
  )
];
