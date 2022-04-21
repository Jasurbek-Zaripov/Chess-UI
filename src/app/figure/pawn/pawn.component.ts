import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SundryService } from 'src/app/sundry.service';
import { EmitBody, Figure } from 'src/app/types';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent implements OnInit {
  @Input() color = 0;
  @Input() coor = '';
  @Output() myEvent = new EventEmitter<EmitBody>();
  colors: any = {
    0: 'text-danger',
    1: 'text-success'
  };
  name = Figure.pawn;
  constructor(private sundryService: SundryService) { }

  ngOnInit(): void {
  }

  getColor() {
    return this.colors[this.color];
  }
  start(event: MouseEvent) {
    this.sundryService.moveFigure(this.coor, this.color, this.name, event, this.myEvent);
  }
}
