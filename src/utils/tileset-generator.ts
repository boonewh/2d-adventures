import Phaser from 'phaser';

/**
 * Generates a simple winter-themed tileset for use in Tiled
 * Creates tiles programmatically until we have proper art assets
 */
export class TilesetGenerator {
  /**
   * Creates a simple 16x16 winter tileset with basic tiles
   * Call this once to generate the tileset texture
   */
  static createWinterTileset(scene: Phaser.Scene): void {
    const tileSize = 16;
    const tilesPerRow = 8;
    const totalTiles = 16;
    const textureWidth = tilesPerRow * tileSize;
    const textureHeight = Math.ceil(totalTiles / tilesPerRow) * tileSize;

    const graphics = scene.add.graphics();

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

    // Tile 12-15: Reserved for future tiles
    graphics.fillStyle(0x333333, 1);
    for (let i = 4; i < 8; i++) {
      graphics.fillRect(tileSize * i, tileSize, tileSize, tileSize);
    }

    // Generate texture
    graphics.generateTexture('winter-tileset', textureWidth, textureHeight);
    graphics.destroy();

    console.log('Winter tileset generated:', textureWidth, 'x', textureHeight);
  }

  /**
   * Saves the tileset as a downloadable PNG (for use in Tiled)
   * Call this in browser console if you need to export the tileset
   */
  static async exportTilesetPNG(scene: Phaser.Scene): Promise<void> {
    // This is a helper for manual export if needed
    const texture = scene.textures.get('winter-tileset');
    if (!texture) {
      console.error('Tileset not generated yet');
      return;
    }

    console.log('Tileset texture available. To export:');
    console.log('1. Open browser DevTools');
    console.log('2. Use canvas.toDataURL() to get PNG data');
    console.log('3. Or screenshot the texture in Phaser debug mode');
  }
}
