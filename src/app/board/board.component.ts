import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  colors: any = { 1: 'bg-dark', 0: 'bg-light' };
  myColor: string | null = null;
  _y = 'ABCDEFGH'.split('');
  _x = '12345678'.split('');

  selected = '';

  coordinate: any = {
    black: {
      rook: {
        'A1': 1,
        'A8': 1
      },
      bishop: {
        'A3': 1,
        'A6': 1
      },
      king: {
        'A4': 1
      }
      ,
      queen: {
        'A5': 1
      },
      knight: {
        'A2': 1,
        'A7': 1
      },
      pawn: {
        'B1': 1,
        'B2': 1,
        'B3': 1,
        'B4': 1,
        'B5': 1,
        'B6': 1,
        'B7': 1,
        'B8': 1,
        first: true
      }
    },
    white: {
      rook: {
        'H1': 1,
        'H8': 1
      },
      bishop: {
        'H3': 1,
        'H6': 1
      },
      king: {
        'H4': 1
      },
      queen: {
        'H5': 1
      },
      knight: {
        'H2': 1,
        'H7': 1
      },
      pawn: {
        'G1': 1,
        'G2': 1,
        'G3': 1,
        'G4': 1,
        'G5': 1,
        'G6': 1,
        'G7': 1,
        'G8': 1,
        first: true
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
    this.myColor = localStorage.getItem('me');
    if (!this.myColor) {
      localStorage.setItem('me', 'white');
      this.myColor = Player[1];
    }
  }
  whiteOrBlack(y: string, x: string, z = 0): string {
    if ((y['charCodeAt'](0) % 2) == (+x % 2)) z = 1;
    return this.colors[z];
  }

  select(coor: string, color: number, name: string, event: any) {
    if (this.myColor != Player[color]) return;
    const reset = () => {
      event.target.style.left = 0 + 'px';
      event.target.style.top = 0 + 'px';
    };

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

        if (x < 1 || x > 8 || y == 'a' || y == 'b') return reset();

        if (name == Figure.pawn) {
          if ((ForY[coor[0] as any] != ForY[y] + 1) || +coor[1] != x) return reset();
        }

        //move
        this.coordinate[Player[color]][name][coor] = 0;
        this.coordinate[Player[color]][name][y + x] = 1;
        color = 0; name = ''; coor = '';
      };
    };
  }
}
export enum Player {
  black,
  white
}
export enum Figure {
  bishop = 'bishop',
  king = 'king',
  knight = 'knight',
  pawn = 'pawn',
  queen = 'queen',
  rook = 'rook'
}
export enum ForY {
  A = 1, B, C, D, E, F, G, H
}