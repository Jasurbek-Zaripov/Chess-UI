import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookComponent implements OnInit {
  @Input() color = 0;
  colors: any = {
    0: 'text-danger',
    1: 'text-success'
  };
  constructor() { }

  ngOnInit(): void {
  }

  getColor() {
    return this.colors[this.color];
  }
}
