import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SundryService } from 'src/app/sundry.service';
import { EmitBody } from 'src/app/types';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent implements OnInit {
  @Input() color = 0;
  @Input() coor = '';
  @Output() myEvent = new EventEmitter<EmitBody>();
  myColor: string | null = '';
  colors: any = {
    0: 'text-danger',
    1: 'text-success'
  };
  constructor(private sundryService: SundryService) { }

  ngOnInit(): void {
    this.myColor = localStorage.getItem('me');
  }

  getColor() {
    return this.colors[this.color];
  }
  start(event: MouseEvent, name: string) {
    this.sundryService.moveFigure(this.coor, this.color, name, event, this.myColor!, this.myEvent);
  }
}
