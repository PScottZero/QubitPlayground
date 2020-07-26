import {Component} from '@angular/core';
import {TensorService} from '../../services/tensor.service';
import {QubitService} from '../../services/qubit.service';
import {AppStateService} from '../../services/app-state.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  constructor(private qubitService: QubitService,
              private tensorService: TensorService,
              private appStateService: AppStateService) {}

  getQubitImage(): string {
    if (this.isEntangled()) {
      return 'qubit_entangled.svg';
    }
    return 'qubit.svg';
  }

  selectQubit(qubitNo: number): void {
    if (this.isTensorMode()) {
      this.tensorService.selectQubit(qubitNo);
    }
  }

  rotateQubit(qubitNo: number): number {
    if (this.isTensorMode()) {
      if (!this.isEntangled()) {
        return this.tensorService.getQubitRotation(qubitNo);
      }
      return 0;
    } else {
      return this.qubitService.getQubitRotation();
    }
  }

  selectionEnabled(): boolean {
    if (this.isTensorMode()) {
      return this.tensorService.selectionEnabled;
    }
    return false;
  }

  isEntangled(): boolean {
    if (this.isTensorMode()) {
      return this.tensorService.isEntangled();
    }
    return false;
  }

  isTensorMode(): boolean {
    return this.appStateService.isTensorMode();
  }
}
