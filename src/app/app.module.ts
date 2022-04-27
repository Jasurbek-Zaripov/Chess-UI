import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KingComponent } from './figure/king/king.component';
import { QueenComponent } from './figure/queen/queen.component';
import { RookComponent } from './figure/rook/rook.component';
import { BishopComponent } from './figure/bishop/bishop.component';
import { KnightComponent } from './figure/knight/knight.component';
import { PawnComponent } from './figure/pawn/pawn.component';
import { ChatComponent } from './chat/chat.component';
import { ModeComponent } from './mode/mode.component';



const config: SocketIoConfig = {
  url: 'http://10.226.33.116:3000', // socket server url;
  options: {
    transports: ['websocket']
  }
};
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    KingComponent,
    QueenComponent,
    RookComponent,
    BishopComponent,
    KnightComponent,
    PawnComponent,
    ChatComponent,
    ModeComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
