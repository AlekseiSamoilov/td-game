export interface ITile {
    x: number;
    y: number;
    type: 'path' | 'tower' | 'empty';
}

export interface IGameState {
    gold: number;
    wave: number;
    lives: number;
}