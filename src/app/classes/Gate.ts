import * as math from 'mathjs';

export class Gate {
  name: string;
  matrices: math.Complex[][][];

  constructor(name: string, matrices: math.Complex[][][]) {
    this.name = name;
    this.matrices = matrices;
  }
}

export const oneQubitGates = [
  new Gate('X',
    [[
      [0, 1],
      [1, 0]
    ]]
  ),
  new Gate('Y',
    [[
      [0, math.multiply(-1, math.i)],
      [math.i, 0]
    ]]
  ),
  new Gate('Z',
    [[
      [1, 0],
      [0, -1]
    ]]
  ),
  new Gate('Hadamard',
    [[
      [math.divide(1, math.sqrt(2)), math.divide(1, math.sqrt(2))],
      [math.divide(1, math.sqrt(2)), math.divide(-1, math.sqrt(2))]
    ]]
  ),
  new Gate('Phase',
    [[
      [1, 0],
      [0, math.i]
    ]]
  ),
  new Gate('T',
    [[
      [1, 0],
      [0, math.exp(math.divide(math.multiply(math.i, math.pi), 4))]
    ]]
  )
];

export const twoQubitGates = [
  new Gate('X',
    [
      [
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
      ]
    ]
  ),
  new Gate('Y',
    [
      [
        [0, 0, math.multiply(-1, math.i), 0],
        [0, 0, 0, math.multiply(-1, math.i)],
        [math.i, 0, 0, 0],
        [0, math.i, 0, 0]
      ],
      [
        [0, math.multiply(-1, math.i), 0, 0],
        [math.i, 0, 0, 0],
        [0, 0, 0, math.multiply(-1, math.i)],
        [0, 0, math.i, 0]
      ]
    ]
  ),
  new Gate('Z',
    [
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, -1, 0],
        [0, 0, 0, -1]
      ],
      [
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, -1]
      ]
    ]
  ),
  new Gate('Hadamard',
    [
      [
        [math.divide(1, math.sqrt(2)), 0, math.divide(1, math.sqrt(2)), 0],
        [0, math.divide(1, math.sqrt(2)), 0, math.divide(1, math.sqrt(2))],
        [math.divide(1, math.sqrt(2)), 0, math.divide(-1, math.sqrt(2)), 0],
        [0, math.divide(1, math.sqrt(2)), 0, math.divide(-1, math.sqrt(2))],
      ],
      [
        [math.divide(1, math.sqrt(2)), math.divide(1, math.sqrt(2)), 0, 0],
        [math.divide(1, math.sqrt(2)), math.divide(-1, math.sqrt(2)), 0, 0],
        [0, 0, math.divide(1, math.sqrt(2)), math.divide(1, math.sqrt(2))],
        [0, 0, math.divide(1, math.sqrt(2)), math.divide(-1, math.sqrt(2))]
      ]
    ]
  ),
  new Gate('Phase',
    [
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, math.i, 0],
        [0, 0, 0, math.i]
      ],
      [
        [1, 0, 0, 0],
        [0, math.i, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, math.i]
      ]
    ]
  ),
  new Gate('T',
    [
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, math.exp(math.divide(math.multiply(math.i, math.pi), 4)), 0],
        [0, 0, 0, math.exp(math.divide(math.multiply(math.i, math.pi), 4))]
      ],
      [
        [1, 0, 0, 0],
        [0, math.exp(math.divide(math.multiply(math.i, math.pi), 4)), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, math.exp(math.divide(math.multiply(math.i, math.pi), 4))]
      ]
    ],
  ),
  new Gate('CNOT',
    [
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0]
      ],
      [
        [1, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0]
      ]
    ]
  ),
  new Gate('CZ',
    [
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, -1]
      ],
      [
        [1, 0, 0, 0],
        [0, 0, 0, -1],
        [0, 0, 1, 0],
        [0, 1, 0, 0]
      ]
    ]
  ),
  new Gate('Swap',
    [
      [
        [1, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1]
      ]
    ]
  ),
  new Gate('QFT',
    [
      [
        [math.divide(1, 2), math.divide(1, 2), math.divide(1, 2), math.divide(1, 2)],
        [math.divide(1, 2), math.divide(math.i, 2), math.divide(-1, 2), math.divide(math.multiply(-1, math.i), 2)],
        [math.divide(1, 2), math.divide(-1, 2), math.divide(1, 2), math.divide(-1, 2)],
        [math.divide(1, 2), math.divide(math.multiply(-1, math.i), 2), math.divide(-1, 2), math.divide(math.i, 2)]
      ]
    ]
  )
];

