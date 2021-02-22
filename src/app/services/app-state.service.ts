import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  tensorMode: boolean;
  qubitDialogVisible: boolean;

  constructor() {
    this.tensorMode = false;
  }

  isTensorMode(): boolean {
    return this.tensorMode;
  }

  toggleMode(): void {
    this.tensorMode = !this.tensorMode;
  }

  qubitDialogIsVisible(): boolean {
    return this.qubitDialogVisible;
  }

  showQubitDialog(): void {
    this.qubitDialogVisible = true;
  }

  hideQubitDialog(): void {
    this.qubitDialogVisible = false;
  }
}
