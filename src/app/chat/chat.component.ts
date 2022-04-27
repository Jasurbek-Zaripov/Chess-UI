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
  newMessage = false;
  intervalId: any;
  writing = false;
  writingIntervalId: any;
  @Input() myName: string = '';

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.fromEvent('writed').subscribe({
      next: () => {
        this.onWrite();
      }
    });
    this.socket.fromEvent('messages').subscribe({
      next: (data: any) => {
        this.messages = data;
        this.messages = data.map((e: any) => {
          e.message = e.message.split('\n');
          return e;
        });
        this.scrollDown();
        this.onNotification();
      }
    });
    this.socket.emit('message');
  }

  scrollDown() {
    const ul = document.getElementById('chat');
    if (ul) {
      setTimeout(() => ul.scroll(0, ul.scrollHeight - 500), 0);
    }
  }

  enter(event: KeyboardEvent) {
    this.socket.emit('write');
    if (event.keyCode != 13 || event.shiftKey) return;
    this.send();
  }

  send() {
    const inp: any = document.getElementById('area');
    if (!inp.value || !inp.value.trim()) {
      setTimeout(() => inp.value = null, 0);
      return;
    }
    const data: chatBody = {
      message: inp.value,
      name: this.myName,
      time: new Date()
    };
    setTimeout(() => inp.value = null, 0);
    this.socket.emit('message', data);
  }

  onNotification() {
    this.newMessage = true;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this.intervalId = setTimeout(() => {
      this.newMessage = false;
    }, 2500);
  }
  onWrite() {
    this.writing = true;
    if (this.intervalId) {
      clearTimeout(this.writingIntervalId);
      this.writingIntervalId = null;
    }
    this.writingIntervalId = setTimeout(() => {
      this.writing = false;
    }, 1000);
  }
}

