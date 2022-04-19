import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KingComponent } from './figure/king/king.component';
import { QueenComponent } from './figure/queen/queen.component';
import { RookComponent } from './figure/rook/rook.component';
import { BishopComponent } from './figure/bishop/bishop.component';
import { KnightComponent } from './figure/knight/knight.component';
import { PawnComponent } from './figure/pawn/pawn.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    KingComponent,
    QueenComponent,
    RookComponent,
    BishopComponent,
    KnightComponent,
    PawnComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
