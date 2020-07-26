import {Component, OnInit} from '@angular/core';
import {TensorService} from '../../services/tensor.service';
import {Gate, oneQubitGates, twoQubitGates} from '../../classes/Gate';
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
    if (this.appStateService.isTensorMode()) {
      return twoQubitGates;
    }
    return oneQubitGates;
  }

  selectGate(gate: Gate): void {
    if (this.appStateService.isTensorMode()) {
      this.tensorService.selectionEnabled = true;
      this.tensorService.setGate(gate);
    } else {
      this.qubitService.applyGate(gate);
    }
  }

  toggleSidebar(): void {
    this.isVisible = !this.isVisible;
  }
}
