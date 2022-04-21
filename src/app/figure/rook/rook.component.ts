import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SundryService } from 'src/app/sundry.service';
import { EmitBody, Figure } from 'src/app/types';

@Component({
  selector: 'app-rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookComponent implements OnInit {
  @Input() color = 0;
  @Input() coor = '';
  @Output() myEvent = new EventEmitter<EmitBody>();
  name = Figure.rook;
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
  start(event: MouseEvent) {
    this.sundryService.moveFigure(this.coor, this.color, this.name, event, this.myColor!, this.myEvent);
  }
}
