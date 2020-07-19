import { Component, OnInit } from '@angular/core';
import { GateType } from '../../gate-type';

@Component({
  selector: 'app-gate-selector',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isVisible: boolean;
  gates: any[];

  ngOnInit(): void {
    this.isVisible = false;
    this.gates = [
      {name: 'X Gate', type: GateType.X, img: 'x'},
      {name: 'Y Gate', type: GateType.Y, img: 'y'},
      {name: 'Z Gate', type: GateType.Z, img: 'z'},
      {name: 'Hadamard Gate', type: GateType.HADAMARD, img: 'hadamard'},
      {name: 'Phase Gate', type: GateType.PHASE, img: 'phase'},
      {name: 'T Gate', type: GateType.T, img: 't'},
      {name: 'CNot Gate', type: GateType.CNOT, img: 'cnot'},
      {name: 'CZ Gate', type: GateType.CZ, img: 'cz'},
      {name: 'Swap Gate', type: GateType.SWAP, img: 'swap'},
    ];
  }

  selectGate(type: GateType): void {
    this.toggleSidebar();
  }

  toggleSidebar(): void {
    this.isVisible = !this.isVisible;
  }
}
