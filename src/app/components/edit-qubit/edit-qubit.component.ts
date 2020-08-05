import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/app-state.service';
import * as math from 'mathjs';
import {QubitInput} from '../../classes/QubitInput';
import {QubitService} from '../../services/qubit.service';
import {TensorService} from '../../services/tensor.service';
import set = Reflect.set;

@Component({
  selector: 'app-edit-qubit',
  templateUrl: './edit-qubit.component.html',
  styleUrls: ['./edit-qubit.component.scss']
})
export class EditQubitComponent implements OnInit {
  oneQubitInputs: QubitInput[];
  twoQubitInputs: QubitInput[];

  constructor(private appStateService: AppStateService,
              private qubitService: QubitService,
              private tensorService: TensorService) { }

  ngOnInit(): void {
    this.oneQubitInputs = [
      new QubitInput('0', '', true),
      new QubitInput('1', '', true)
    ];
    this.twoQubitInputs = [
      new QubitInput('00', '', true),
      new QubitInput('01', '', true),
      new QubitInput('10', '', true),
      new QubitInput('11', '', true),
    ];
  }

  getInputs(): QubitInput[] {
    if (this.isTensorMode()) {
      return this.twoQubitInputs;
    } else {
      return this.oneQubitInputs;
    }
  }

  qubitDialogIsVisible(): boolean {
    return this.appStateService.qubitDialogIsVisible();
  }

  clearInputs(qubitInputs: QubitInput[]): void {
    for (const qubitInput of qubitInputs) {
      qubitInput.value = '';
      qubitInput.valid = true;
    }
  }

  hideQubitDialog(): void {
    this.appStateService.hideQubitDialog();
    this.clearInputs(this.oneQubitInputs);
    this.clearInputs(this.twoQubitInputs);
  }

  isTensorMode(): boolean {
    return this.appStateService.isTensorMode();
  }

  getAmps(): math.Complex[] {
    const amps = [];
    for (const qubitInput of this.getInputs()) {
      amps.push(math.evaluate(qubitInput.value));
    }
    return amps;
  }

  setAmps(amps: math.Complex[]): void {
    if (this.isTensorMode()) {
      this.tensorService.setAmps(amps);
    } else {
      this.qubitService.setAmps(amps);
    }
  }

  submitQubitSettings(): void {
    if (this.inputsValid()) {
      let norm = 0;
      const amps = [];
      for (const amp of this.getAmps()) {
        norm = math.add(norm, math.pow(amp, 2));
      }
      norm = math.sqrt(norm);
      for (const amp of this.getAmps()) {
        amps.push(math.divide(amp, norm));
      }
      this.setAmps(amps);
      this.hideQubitDialog();
    }
  }

  inputsValid(): boolean {
    let allValid = true;
    for (const qubitInput of this.getInputs()) {
      try {
        math.evaluate(qubitInput.value);
        qubitInput.valid = true;
      } catch {
        qubitInput.valid = false;
        allValid = false;
      }

      if (qubitInput.value.trim().length === 0) {
        qubitInput.valid = false;
        allValid = false;
      }
    }
    return allValid;
  }

  useSmallerContainer(): boolean {
    return !this.isTensorMode() && (window.screen.width < 700) && this.qubitDialogIsVisible();
  }
}
