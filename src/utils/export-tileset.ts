/**
 * Utility to export the programmatically generated tileset to a PNG file
 * Run this scene once to generate the tileset image file
 */

import Phaser from 'phaser';

export class TilesetExportScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TilesetExportScene' });
  }

  create(): void {
    const tileSize = 16;
    const tilesPerRow = 8;
    const textureWidth = tilesPerRow * tileSize;
    const textureHeight = 2 * tileSize; // 2 rows

    const graphics = this.add.graphics();

    // Same tileset generation as before
    this.generateTileset(graphics, tileSize);

    // Generate texture
    graphics.generateTexture('winter-tileset-export', textureWidth, textureHeight);

    // Get the canvas and convert to blob
    const canvas = this.textures.getFrame('winter-tileset-export').source.image as HTMLCanvasElement;

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Failed to create blob');
        return;
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'winter-tileset.png';
      link.click();

      console.log('Tileset exported as winter-tileset.png');
      console.log('Save it to: public/assets/tilesets/winter-tileset.png');
    });

    graphics.destroy();
  }

  private generateTileset(graphics: Phaser.GameObjects.Graphics, tileSize: number): void {
    // Tile 0: Snow ground (light)
    graphics.fillStyle(0xf0f8ff, 1);
    graphics.fillRect(0, 0, tileSize, tileSize);
    graphics.fillStyle(0xe6f2ff, 1);
    graphics.fillRect(2, 2, 4, 4);
    graphics.fillRect(8, 6, 3, 3);
    graphics.fillRect(4, 10, 3, 3);

    // Tile 1: Snow ground (medium)
    graphics.fillStyle(0xe0e8f0, 1);
    graphics.fillRect(tileSize, 0, tileSize, tileSize);
    graphics.fillStyle(0xd0d8e0, 1);
    graphics.fillRect(tileSize + 3, 3, 3, 3);
    graphics.fillRect(tileSize + 9, 7, 2, 2);

    // Tile 2: Ice/frozen ground
    graphics.fillStyle(0xb8d4e8, 1);
    graphics.fillRect(tileSize * 2, 0, tileSize, tileSize);
    graphics.fillStyle(0xa0c0d8, 1);
    graphics.fillRect(tileSize * 2 + 1, 1, tileSize - 2, tileSize - 2);
    graphics.fillStyle(0xd0e0f0, 1);
    graphics.fillRect(tileSize * 2 + 4, 4, 2, 2);

    // Tile 3: Stone wall (gray)
    graphics.fillStyle(0x808080, 1);
    graphics.fillRect(tileSize * 3, 0, tileSize, tileSize);
    graphics.fillStyle(0x606060, 1);
    graphics.fillRect(tileSize * 3 + 1, 1, tileSize - 2, tileSize - 2);
    graphics.fillStyle(0x707070, 1);
    graphics.fillRect(tileSize * 3 + 3, 3, 4, 4);

    // Tile 4: Dark stone wall
    graphics.fillStyle(0x404040, 1);
    graphics.fillRect(tileSize * 4, 0, tileSize, tileSize);
    graphics.fillStyle(0x303030, 1);
    graphics.fillRect(tileSize * 4 + 2, 2, 6, 6);

    // Tile 5: Tree (dark green)
    graphics.fillStyle(0x2d5016, 1);
    graphics.fillRect(tileSize * 5, 0, tileSize, tileSize);
    graphics.fillStyle(0x1a3010, 1);
    graphics.fillRect(tileSize * 5 + 4, 4, 8, 8);
    graphics.fillStyle(0x3d6026, 1);
    graphics.fillRect(tileSize * 5 + 6, 6, 4, 4);

    // Tile 6: Snowy tree
    graphics.fillStyle(0x2d5016, 1);
    graphics.fillRect(tileSize * 6, 0, tileSize, tileSize);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(tileSize * 6, 0, tileSize, 4);
    graphics.fillRect(tileSize * 6 + 2, 4, 12, 2);

    // Tile 7: Rock/boulder
    graphics.fillStyle(0x606060, 1);
    graphics.fillRect(tileSize * 7, 0, tileSize, tileSize);
    graphics.fillStyle(0x808080, 1);
    graphics.fillRect(tileSize * 7 + 2, 2, 10, 10);
    graphics.fillStyle(0x505050, 1);
    graphics.fillRect(tileSize * 7 + 8, 8, 6, 6);

    // Row 2
    // Tile 8: Dirt/path
    graphics.fillStyle(0x8b7355, 1);
    graphics.fillRect(0, tileSize, tileSize, tileSize);
    graphics.fillStyle(0x6b5335, 1);
    graphics.fillRect(2, tileSize + 2, 4, 4);

    // Tile 9: Water/ice water
    graphics.fillStyle(0x4080c0, 1);
    graphics.fillRect(tileSize, tileSize, tileSize, tileSize);
    graphics.fillStyle(0x60a0e0, 1);
    graphics.fillRect(tileSize + 3, tileSize + 3, 6, 6);

    // Tile 10: Deep snow
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(tileSize * 2, tileSize, tileSize, tileSize);
    graphics.fillStyle(0xf0f8ff, 1);
    graphics.fillRect(tileSize * 2 + 2, tileSize + 2, 12, 12);

    // Tile 11: Wooden floor
    graphics.fillStyle(0x8b6914, 1);
    graphics.fillRect(tileSize * 3, tileSize, tileSize, tileSize);
    graphics.fillStyle(0x6b4914, 1);
    for (let i = 0; i < 3; i++) {
      graphics.fillRect(tileSize * 3, tileSize + i * 5, tileSize, 1);
    }

    // Tile 12-15: Reserved
    graphics.fillStyle(0x333333, 1);
    for (let i = 4; i < 8; i++) {
      graphics.fillRect(tileSize * i, tileSize, tileSize, tileSize);
    }
  }
}
