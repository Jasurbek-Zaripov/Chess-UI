import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SundryService } from 'src/app/sundry.service';
import { EmitBody, Figure } from 'src/app/types';

@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']
})
export class KingComponent implements OnInit {
  @Input() color = 0;
  @Input() coor = '';
  @Output() myEvent = new EventEmitter<EmitBody>();
  name = Figure.king;
  colors: any = {
    0: 'text-danger',
    1: 'text-success'
  };
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