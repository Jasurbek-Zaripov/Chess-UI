import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit {

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
