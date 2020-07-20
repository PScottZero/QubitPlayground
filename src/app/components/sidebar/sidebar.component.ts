import { Component, OnInit } from '@angular/core';
import { gateList } from '../../GateList';
import { QubitService } from '../../services/qubit.service';
import {Gate} from '../../Gate';

@Component({
  selector: 'app-gate-selector',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isVisible: boolean;
  gates: Gate[];

  constructor(private qubitService: QubitService) {}

  ngOnInit(): void {
    this.gates = gateList;
    this.isVisible = false;
  }

  selectGate(gate: Gate): void {
    this.toggleSidebar();
    this.qubitService.setGate(gate);
  }

  toggleSidebar(): void {
    this.isVisible = !this.isVisible;
  }
}
