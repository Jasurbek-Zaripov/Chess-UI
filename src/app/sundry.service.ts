import { EventEmitter, Injectable } from '@angular/core';
import { EmitBody, Player } from './types';

@Injectable({
  providedIn: 'root'
})
export class SundryService {

  constructor() { }
  reset(event: any) {
    event.target.style.left = 0 + 'px';
    event.target.style.top = 0 + 'px';
  };
  changeCoordinate(coordinate: any, color: number, coor: string, newcoor: string, name: string) {
    //move
    coordinate[Player[color]][name][coor] = 0;
    coordinate[Player[color]][name][newcoor] = 1;
  }
  moveFigure(coor: string, color: number, name: string, event: any, myColor: string, myEvent: EventEmitter<EmitBody>) {
    if (myColor != Player[color]) return;

    document.onmousemove = (eve) => {
      event.target.style.left = eve.pageX - event.pageX + 'px';
      event.target.style.top = eve.pageY - event.pageY + 'px';

      document.onmouseup = (e) => {
        document.onmousemove = null;
        if (!name) return;
        const Y: any = { a: 0, A: 100, B: 200, C: 300, D: 400, E: 500, F: 600, G: 700, H: 800, b: 9999, };
        let y: any = e.pageY - 50;
        for (const key in Y) if (y <= Y[key]) { y = key; break; }
        let x = e.pageX - 150;
        x = x / 100 | 0;
        if (x < 1 || x > 8 || y == 'a' || y == 'b') return this.reset(event);
        myEvent.emit({ color, coor, newcoor: y + x, name });
      };
    };
  }
}
