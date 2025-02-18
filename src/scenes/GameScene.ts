import 'phaser';
import { IGameState, ITile } from '../types';

export class GameScene extends Phaser.Scene {
    private tiles: ITile[][] = [];
    private tileSize: number = 32;
    private mapWidth: number = 20;
    private mapHeight: number = 15;
    private gameState: IGameState = {
        gold: 100,
        wave: 1,
        lives: 20
    };

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {

    }
}