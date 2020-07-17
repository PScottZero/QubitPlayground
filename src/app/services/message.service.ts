import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private currentMessage: string;

  getCurrentMessage(): string {
    return this.currentMessage;
  }

  setCurrentMessage(newMessage: string): void {
    this.currentMessage = newMessage;
  }
}
