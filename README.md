# Qubit Playground

Qubit Playground is a web app that simulates one or two qubits at a time. You can interact with these qubits using one of many quantum gates. You can also measure the qubits to make them collapse into a specific state. If you have no experience with quantum computing, I would recommend reading these before using this web app:

- https://en.wikipedia.org/wiki/Quantum_computing
- https://en.wikipedia.org/wiki/Quantum_logic_gate

# One Qubit Mode

![Qubit Playground in one qubit mode](https://i.imgur.com/cR0dXgo.png)

By default, the website loads into one qubit mode. In this mode, you can apply the following one qubit gates, which can be found in the gates sidebar:

- Pauli-X
- Pauli-Y
- Pauli-Z
- Hadamard
- Phase
- π/8 (T)

The gates sidebar also contains the measurement tool which lets you measure the qubit. When applying any of the gates or measurement in one qubit mode, the action will be performed automatically, since there is only one qubit to select. This differs from two qubit mode, which is discussed next.

By default, the qubit is in the zero state. However, by clicking on the 'Change State' button, you can set custom probability amplitudes for the zero and one state. If the sum of the square of the amplitudes you input does not add up to 1, the probability amplitudes will automatically be normalized. If the inputs are not valid, the input field will turn red. You can input anything that the math.js library accepts as a valid number (e.g. 1/sqrt(2), 1+2i).

# Two Qubit Mode

![Qubit Playground in two qubit mode](https://i.imgur.com/1jV1hrV.png)

Two qubit mode allows you to interact with a system of two qubits. This mode is very similar to one qubit mode except now, since there are two qubits, the qubits can be entangled with each other.

In two qubit mode, you can apply the same gates you could apply in one qubit mode, but there are now several gates that take two qubits as input instead of one:

- Controlled NOT (CNOT)
- Controlled Z (CZ)
- Swap
- Quantum Fourier Transform (QFT)

To apply gates with only one qubit as input, first click on the one qubit gate you want to apply from the gate sidebar, then click on the qubit you want to apply the gate to. Also, the CNOT and CZ gates need a qubit to be selected as the 'control' bit. When you select either of these gates, you will then need to click on the qubit you want as the control bit. The Swap and QFT gates do not require you to select any qubits, and are performed automatically when you select them.

By default, both qubits start in the zero state. However, like in one qubit mode, the states can be modified by clicking the 'Change State' button.

Since you are now dealing with two qubits, the qubits can become entangled with each other. For example, if you apply a Hadamard gate to the first qubit (alpha), then apply the CNOT gate with the first qubit as the control bit, the resulting system of two qubits will be entangled. This entanglement is represented by a border surrounding both qubits. Measuring either qubit will destroy the entanglement.

![Qubits are entangled](https://i.imgur.com/RkF2yxE.png)
