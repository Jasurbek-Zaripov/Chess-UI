import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent implements OnInit {
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
