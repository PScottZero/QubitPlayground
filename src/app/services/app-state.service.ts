import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  tensorMode: boolean;

  constructor() {
    this.tensorMode = false;
  }

  isTensorMode(): boolean {
    return this.tensorMode;
  }

  toggleMode(): void {
    this.tensorMode = !this.tensorMode;
  }
}
