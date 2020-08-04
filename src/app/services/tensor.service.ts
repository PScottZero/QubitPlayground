import {Injectable} from '@angular/core';
import {Tensor} from '../classes/Tensor';
import {Gate} from '../classes/Gate';
import * as math from 'mathjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TensorService {
  qubitAmps: math.Complex[];
  tensor: Tensor;
  gate: Gate;
  measureMode: boolean;
  selectionEnabled: boolean;

  constructor(private messageService: MessageService) {
    this.tensor = new Tensor([1, 0, 0, 0]);
    this.qubitAmps = this.tensor.decompose();
    this.gate = null;
    this.measureMode = false;
    this.selectionEnabled = false;
  }

  selectQubit(qubitNo: number): void {
    if (this.measureMode) {
      this.qubitAmps = this.tensor.measure(qubitNo);
      this.measureMode = false;
    } else if (this.gate) {
      this.qubitAmps = this.tensor.applyGate(this.gate, qubitNo);
      this.gate = null;
    }
    this.messageService.setTensorMessage(this.tensor);
    this.selectionEnabled = false;
  }

  setGate(gate: Gate): void {
    this.gate = gate;
    if (gate.name === 'CNOT' || gate.name === 'CZ') {
      this.messageService.setSelectControlQubitMessage(gate);
    } else if (gate.name === 'Swap' || gate.name === 'QFT') {
      this.selectQubit(0);
    } else {
      this.messageService.setSelectQubitMessage(gate);
    }
  }

  getQubitRotation(qubitNo: number): number {
    return -math.multiply(this.qubitAmps[qubitNo], 90);
  }

  isEntangled(): boolean {
    return this.tensor.isEntangled();
  }

  setTensorMessage(): void {
    this.messageService.setTensorMessage(this.tensor);
  }

  setAmps(amps: math.Complex[]): void {
    this.tensor.amps = amps;
    this.setTensorMessage();
  }

  setMeasureMode(): void {
    this.measureMode = true;
    this.selectionEnabled = true;
    this.messageService.setMeasureMessage();
  }
}
