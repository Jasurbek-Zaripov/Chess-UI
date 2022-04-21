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
export enum ForY { A = 1, B, C, D, E, F, G, H }
export interface EmitBody { coor: string, newcoor: string, name: string; event: any; }