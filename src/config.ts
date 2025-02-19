import { MainScene } from "./scenes/MainScene";

export const GRID_SIZE = 52;
export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 15;

export const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GRID_WIDTH * GRID_SIZE,
    height: GRID_HEIGHT * GRID_SIZE,
    backgroundColor: '#2d2d2d',
    parent: 'game',
    scene: MainScene,
}