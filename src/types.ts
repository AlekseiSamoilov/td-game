import Phaser from "phaser";

export interface GridCell {
    x: number;
    y: number;
    occupied: boolean;
    type: 'empty' | 'path' | 'mage';
}

export interface PathPoint {
    x: number;
    y: number;
}

export interface Mage {
    sprite: Phaser.GameObjects.Sprite;
    gridX: number;
    gridY: number;
}