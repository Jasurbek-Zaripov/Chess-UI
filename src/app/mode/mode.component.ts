import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {
  islight = true;
  body: any;
  @Output() squareMode = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.body = document.querySelector('body');
  }

  onClick() {
    this.squareMode.emit();
    this.body.classList.toggle('dark');
  }
}
