import { Scene } from "phaser";
import { GridCell, Mage, PathPoint } from "../types";
import { GRID_HEIGHT, GRID_SIZE, GRID_WIDTH } from "../config";

export class MainScene extends Scene {
    private grid: GridCell[][] = [];
    private path: PathPoint[] = [];
    private mages: Mage[] = [];

    constructor() {
        super({ key: 'MainScene' });
    }

    preload(): void {
        this.load.spritesheet('mage', 'assets/mage.png', {
            frameWidth: GRID_SIZE,
            frameHeight: GRID_SIZE
        });

        this.load.spritesheet('tiles', 'assets/tiles.png', {
            frameWidth: GRID_SIZE,
            frameHeight: GRID_SIZE
        });
    }

    create(): void {
        this.createGrid();
        this.generatePath();
        this.setupInputHandlers();
    }

    private createGrid(): void {
        this.grid = [];

        for (let y = 0; y < GRID_HEIGHT; y++) {
            this.grid[y] = [];  // Создаем строку массива
            for (let x = 0; x < GRID_WIDTH; x++) {
                // Создаем ячейку
                this.grid[y][x] = {
                    x: x * GRID_SIZE,
                    y: y * GRID_SIZE,
                    occupied: false,
                    type: 'empty'
                };

                // Рисуем сетку
                this.add.rectangle(
                    x * GRID_SIZE,
                    y * GRID_SIZE,
                    GRID_SIZE,
                    GRID_SIZE,
                    0x222222
                ).setOrigin(0);

                // Добавляем линии сетки
                this.add.rectangle(
                    x * GRID_SIZE,
                    y * GRID_SIZE,
                    GRID_SIZE,
                    GRID_SIZE
                ).setStrokeStyle(1, 0x444444).setOrigin(0);
            }
        }
    }

    private generatePath(): void {
        let currentX = 0;
        let currentY = Math.floor(GRID_HEIGHT / 2);

        this.path.push({ x: currentX, y: currentY });

        while (currentX < GRID_WIDTH - 1) {
            const direction = Math.random() < 0.7 ? 'right' :
                (currentY > 2 && Math.random() < 0.5) ? 'up' :
                    (currentY < GRID_HEIGHT - 3) ? 'down' : 'right';

            switch (direction) {
                case 'right':
                    currentX++;
                    break;
                case 'up':
                    currentY--;
                    break;
                case 'down':
                    currentY++;
                    break;
            }

            this.path.push({ x: currentX, y: currentY });
            this.grid[currentY][currentX].type = 'path';

            this.add.rectangle(
                currentX * GRID_SIZE,
                currentY * GRID_SIZE,
                GRID_SIZE,
                GRID_SIZE,
                0x666666
            ).setOrigin(0);
        }
    }

    private setupInputHandlers(): void {
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const x = Math.floor(pointer.x / GRID_SIZE);
            const y = Math.floor(pointer.y / GRID_SIZE);

            if (this.canPlaceMage(x, y)) {
                this.placeMage(x, y);
            }
        });
    }

    private canPlaceMage(x: number, y: number): boolean {
        return x >= 0 && x < GRID_WIDTH &&
            y >= 0 && y < GRID_HEIGHT &&
            !this.grid[y][x].occupied &&
            this.grid[y][x].type !== 'path';
    }

    private placeMage(x: number, y: number): void {
        const mage = this.add.sprite(
            x * GRID_SIZE + GRID_SIZE / 2,
            y * GRID_SIZE + GRID_SIZE / 2,
            'mage'
        ).setScale(2);

        this.grid[y][x].occupied = true;
        this.grid[y][x].type = 'mage';

        this.mages.push({
            sprite: mage,
            gridX: x,
            gridY: y
        });
    }
}