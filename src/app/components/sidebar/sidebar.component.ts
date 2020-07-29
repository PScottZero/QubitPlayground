import {Component, OnInit} from '@angular/core';
import {TensorService} from '../../services/tensor.service';
import {Gate, gateList} from '../../classes/Gate';
import {QubitService} from '../../services/qubit.service';
import {AppStateService} from '../../services/app-state.service';

@Component({
  selector: 'app-gate-selector',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isVisible: boolean;

  constructor(private qubitService: QubitService,
              private tensorService: TensorService,
              private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.isVisible = false;
  }

  getGates(): Gate[] {
    const maxSize = (this.appStateService.isTensorMode()) ? 4 : 2;
    return gateList.filter((gate: Gate) => gate.matrix.length <= maxSize);
  }

  selectGate(gate: Gate): void {
    if (this.appStateService.isTensorMode()) {
      this.tensorService.selectionEnabled = true;
      this.tensorService.setGate(gate);
    } else {
      this.qubitService.applyGate(gate);
    }

    if (window.screen.width < 700) {
      this.isVisible = false;
    }
  }

  show(): void {
    if (window.screen.width >= 700) {
      this.isVisible = true;
    }
  }

  hide(): void {
    if (window.screen.width >= 700) {
      this.isVisible = false;
    }
  }

  toggle(): void {
    if (window.screen.width < 700) {
      this.isVisible = !this.isVisible;
    }
  }
}
