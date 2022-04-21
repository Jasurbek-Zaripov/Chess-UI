import { EventEmitter, Injectable } from '@angular/core';
import { EmitBody, Figure, ForY, Player } from './types';

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
  removeFigure(obj: any, _key: string, del = true, remove = [false]): boolean {
    if (typeof obj != 'object') return remove[0];
    Object.keys(obj).forEach(key => {
      if (key == _key && obj[key]) {
        if (del) obj[key] = 0;
        remove[0] = true;
      }
      this.removeFigure(obj[key], _key, del, remove);
    });
    return remove[0];
  }
  canMove(name: string, coor: string, newcoor: string, event: any, coordinate: any, color: number): boolean | void {
    if (name == Figure.pawn) {
      if (ForY[coor[0] as any] != (ForY[newcoor[0] as any] + 1)) { this.reset(event); return false; }
      else if (newcoor[1] != coor[1]) {
        if (((+coor[1] == (+newcoor[1] - 1)) || (+coor[1] == (+newcoor[1] + 1))) && (ForY[coor[0] as any] == (ForY[newcoor[0] as any] + 1))) {
          if (this.removeFigure(coordinate[Player[color ? 0 : 1]], newcoor)) return true;
          else { this.reset(event); return false; }
        } else { this.reset(event); return false; }
      }
      else if (coordinate[Player[color]][name][newcoor]) { this.reset(event); return false; }
      if (this.removeFigure(coordinate[Player[color ? 0 : 1]], newcoor, false)) return false;
      if (this.removeFigure(coordinate[Player[color]], newcoor, false)) return false;
      return true;
    }
    else if (name == Figure.knight) {
      const rY = Math.abs(+ForY[coor[0] as any] - +ForY[newcoor[0] as any]);
      const rX = Math.abs(+coor[1] - +newcoor[1]);
      if (rX == 1 && rY == 2 || rX == 2 && rY == 1) {
        if (this.removeFigure(coordinate[Player[color ? 0 : 1]], newcoor)) return true;
        else if (this.removeFigure(coordinate[Player[color]], newcoor, false)) return false;
        return true;
      } else return false;
    }
    else if (name == Figure.rook) {
      let vertical = true;
      let items;
      if (coor[0] == newcoor[0]) {
        items = [1, 2, 3, 4, 5, 6, 7, 8];
        let cX = items.indexOf(+coor[1]);
        let nX = items.indexOf(+newcoor[1]);
        if (cX > nX) items = items.slice(nX + 1, cX);
        else items = items.slice(cX + 1, nX);
      } else if (coor[1] == newcoor[1]) {
        vertical = false;
        items = 'ABCDEFGH';
        let cX = items.indexOf(coor[0]);
        let nX = items.indexOf(newcoor[0]);
        if (cX > nX) items = items.slice(nX + 1, cX);
        else items = items.slice(cX + 1, nX);
      }
      if (!items) return false;
      for (const i of items) {
        if (this.removeFigure(coordinate[Player[color ? 0 : 1]], vertical ? coor[0] + i : i + coor[1], false)) return false;
        else if (this.removeFigure(coordinate[Player[color]], vertical ? coor[0] + i : i + coor[1], false)) return false;
      }
      if (this.removeFigure(coordinate[Player[color ? 0 : 1]], newcoor)) return true;
      else if (this.removeFigure(coordinate[Player[color]], newcoor, false)) return false;
      return true;
    }
  }
  moveFigure(coor: string, color: number, name: string, event: any, myColor: string, myEvent: EventEmitter<EmitBody>) {
    if (myColor != Player[color]) return;
    if (event.target.classList.contains('z')) event.target.classList.remove('z');
    event.target.classList.add('z');

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
        myEvent.emit({ color, coor, newcoor: y + x, name, event });
      };
    };
  }
}
