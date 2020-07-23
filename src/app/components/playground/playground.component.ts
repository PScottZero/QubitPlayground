import { Component } from '@angular/core';
import { QubitService } from '../../services/qubit.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  constructor(private qubitService: QubitService) {}

  selectQubit(qubitNo: number): void {
    this.qubitService.selectQubit(qubitNo);
  }

  rotateQubit(qubitNo: number): number {
    return this.qubitService.getQubitRotation(qubitNo);
  }

  selectionEnabled(): boolean {
    return this.qubitService.selectionEnabled;
  }
}
