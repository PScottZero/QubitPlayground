import {Component} from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent {

  constructor(private messageService: MessageService) { }

  getMessage(): string {
    return this.messageService.getMessage();
  }
}
