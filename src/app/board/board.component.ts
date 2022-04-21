import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SundryService } from '../sundry.service';
import { EmitBody, SocketBody } from '../types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  colors: any = { 1: 'bg-dark', 0: 'bg-light' };
  _y = 'ABCDEFGH'.split('');
  _x = '12345678'.split('');
  myName = '';

  coordinate: any = {
    black: {
      rook: { 'A1': 1, 'A8': 1 },
      bishop: { 'A3': 1, 'A6': 1 },
      king: { 'A4': 1 },
      queen: { 'A5': 1 },
      knight: { 'A2': 1, 'A7': 1 },
      pawn: { 'B1': 1, 'B2': 1, 'B3': 1, 'B4': 1, 'B5': 1, 'B6': 1, 'B7': 1, 'B8': 1, }
    },
    white: {
      rook: { 'H1': 1, 'H8': 1 },
      bishop: { 'H3': 1, 'H6': 1 },
      king: { 'H4': 1 },
      queen: { 'H5': 1 },
      knight: { 'H2': 1, 'H7': 1 },
      pawn: { 'G1': 1, 'G2': 1, 'G3': 1, 'G4': 1, 'G5': 1, 'G6': 1, 'G7': 1, 'G8': 1, }
    }
  };
  constructor(private sundryService: SundryService,
    private socket: Socket) { }

  ngOnInit(): void {
    this.socket.fromEvent<SocketBody>('update').subscribe({
      next: (data: SocketBody) => {
        data.coordinate = this.reverseCoordinate(data.coordinate);
        data.newcoordinate = this.reverseCoordinate(data.newcoordinate);
        if (data.player != this.myName) this.sundryService.changeCoordinate(this.coordinate, 0, data.coordinate, data.newcoordinate, data.figure);
        this.sundryService.removeFigure(this.coordinate['white'], data.newcoordinate);
      }
    });

    this.myName = '' + Date.now();
  }

  whiteOrBlack(y: string, x: string, z = 0): string {
    if ((y['charCodeAt'](0) % 2) == (+x % 2)) z = 1;
    return this.colors[z];
  }

  reverseCoordinate(coordinate: string) {
    const arr: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const y = arr[Math.abs(arr.indexOf(coordinate[0]) - 7)];
    const x = Math.abs(+coordinate[1] - 9);
    return y + x;
  }

  move(body: EmitBody) {
    const can = this.sundryService.canMove(body.name, body.coor, body.newcoor, body.event, this.coordinate);
    if (!can) this.sundryService.reset(body.event);
    else {
      this.sundryService.changeCoordinate(this.coordinate, 1, body.coor, body.newcoor, body.name);
      const request: SocketBody = {
        coordinate: body.coor,
        newcoordinate: body.newcoor,
        figure: body.name,
        player: this.myName
      };
      this.socket.emit('moved', request);
    }
  }
}
