import { Injectable } from '@angular/core';
import { Qubit } from '../classes/Qubit';
import * as math from 'mathjs';
import { MessageService } from './message.service';
import { Gate } from '../classes/Gate';

@Injectable({
  providedIn: 'root',
})
export class QubitService {
  qubit: Qubit;

  constructor(private messageService: MessageService) {
    this.qubit = new Qubit([1, 0]);
    this.messageService.setQubitMessage(this.qubit);
  }

  applyGate(gate: Gate): void {
    this.qubit.applyGate(gate);
    this.messageService.setQubitMessage(this.qubit);
  }

  getQubitRotation(): number {
    const amp0 = math.unequal(math.im(this.qubit.amps[0]), 0)
      ? math.norm(this.qubit.amps[0])
      : math.re(this.qubit.amps[0]);
    const amp1 = math.unequal(math.im(this.qubit.amps[1]), 0)
      ? math.norm(this.qubit.amps[1])
      : math.re(this.qubit.amps[1]);
    return math.multiply(
      -1,
      math.multiply(math.atan2(amp1, amp0), math.divide(180, math.pi))
    );
  }

  setQubitMessage(): void {
    this.messageService.setQubitMessage(this.qubit);
  }

  setAmps(amps: math.Complex[]): void {
    this.qubit.amps = amps;
    this.setQubitMessage();
  }

  measure(): void {
    this.qubit.measure();
    this.setQubitMessage();
  }
}
