import {Gate} from './Gate';
import * as math from 'mathjs';

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
      [1 / math.sqrt(2), 1 / math.sqrt(2)],
      [1 / math.sqrt(2), -1 / math.sqrt(2)]
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
      [0, math.exp(math.divide(math.multiply(math.i, math.pi), 4))]
    ],
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
];
