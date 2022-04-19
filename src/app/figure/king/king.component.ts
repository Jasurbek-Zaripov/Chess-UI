import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']
})
export class KingComponent implements OnInit {
  @Input() color = 0;
  @Input() now = '';
  colors: any = {
    0: 'text-danger',
    1: 'text-success'
  };
  @Output() moved = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  getColor() {
    return this.colors[this.color];
  }

  move(event: any) {

  }
}
export interface King {
  x: number,
  y: number,
  name: 'king',
  color: number;
  now: string;
}