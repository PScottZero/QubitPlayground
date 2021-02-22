import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { QubitService } from '../../services/qubit.service';
import { TensorService } from '../../services/tensor.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  constructor(
    private qubitService: QubitService,
    private tensorService: TensorService,
    private appStateService: AppStateService
  ) {}

  toggleSlider(): void {
    this.appStateService.toggleMode();
    if (this.appStateService.isTensorMode()) {
      this.tensorService.setTensorMessage();
    } else {
      this.qubitService.setQubitMessage();
    }
  }

  getSliderLabel(): number {
    if (this.appStateService.isTensorMode()) {
      return 2;
    }
    return 1;
  }
}
