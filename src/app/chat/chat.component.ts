import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { chatBody } from '../types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: chatBody[] = [];
  @Input() myName: string = '';

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.fromEvent('messages').subscribe({
      next: (data: any) => this.messages = data
    });
    this.socket.emit('message');
  }

  enter(event: KeyboardEvent, inp: HTMLInputElement) {
    if (event.keyCode != 13) return;
    this.send(inp);
  }

  send(inp: HTMLInputElement) {
    if (!inp.value || !inp.value.trim()) {
      inp.value = '';
      return;
    }
    const data: chatBody = {
      message: inp.value,
      name: this.myName,
      time: new Date().toLocaleTimeString()
    };
    this.socket.emit('message', data);
    inp.value = '';
  }
}

