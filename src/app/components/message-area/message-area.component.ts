import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {}

  getMessage(): string {
    return this.messageService.getMessage();
  }
}
