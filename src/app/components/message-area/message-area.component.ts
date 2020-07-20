import { Component, OnInit } from '@angular/core';
import {QubitService} from '../../services/qubit.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {

  constructor(private qubitService: QubitService) { }

  ngOnInit(): void {}

  getMessage(): string {
    return this.qubitService.getMessage();
  }
}
