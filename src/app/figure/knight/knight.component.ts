import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class KnightComponent implements OnInit {
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
