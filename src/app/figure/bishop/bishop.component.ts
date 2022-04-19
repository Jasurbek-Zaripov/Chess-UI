import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.css']
})
export class BishopComponent implements OnInit {
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
