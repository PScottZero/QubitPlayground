import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss'],
})
export class MessageAreaComponent {
  constructor(
    private messageService: MessageService,
    private appStateService: AppStateService
  ) {}

  getMessage(): string {
    return this.messageService.getMessage();
  }

  showQubitDialog(): void {
    this.appStateService.showQubitDialog();
  }
}
