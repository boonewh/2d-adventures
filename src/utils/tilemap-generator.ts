import Phaser from 'phaser';

/**
 * Generates tilemaps programmatically for the game
 * Uses same tileset as the visual generator (16 tiles)
 */
export class TilemapGenerator {
  private static readonly TILE_SIZE = 16;

  /**
   * Creates the winter tileset texture
   */
  static createWinterTileset(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics();
    const tileSize = this.TILE_SIZE;

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

    // Generate texture
    graphics.generateTexture('winter-tileset', tileSize * 8, tileSize * 2);
    graphics.destroy();

    console.log('Winter tileset created');
  }

  /**
   * Creates a simple test room map
   * Returns a Phaser tilemap with collision setup
   */
  static createTestRoom(scene: Phaser.Scene): Phaser.Tilemaps.Tilemap {
    const mapWidth = 50;
    const mapHeight = 40;

    // Create ground layer data (all snow)
    const groundData: number[][] = [];
    for (let y = 0; y < mapHeight; y++) {
      const row: number[] = [];
      for (let x = 0; x < mapWidth; x++) {
        // Mix of snow tiles (0, 1, 2) for variety
        if (Math.random() < 0.7) {
          row.push(0); // Light snow
        } else if (Math.random() < 0.5) {
          row.push(1); // Medium snow
        } else {
          row.push(2); // Ice
        }
      }
      groundData.push(row);
    }

    // Create walls layer data
    const wallsData: number[][] = [];
    for (let y = 0; y < mapHeight; y++) {
      const row: number[] = [];
      for (let x = 0; x < mapWidth; x++) {
        let tile = -1; // Empty by default

        // Border walls (stone wall)
        if (y === 0 || y === mapHeight - 1 || x === 0 || x === mapWidth - 1) {
          // Leave gaps for "doors" at midpoints
          const isTopDoor = y === 0 && x >= 24 && x <= 26;
          const isBottomDoor = y === mapHeight - 1 && x >= 24 && x <= 26;
          const isLeftDoor = x === 0 && y >= 19 && y <= 21;
          const isRightDoor = x === mapWidth - 1 && y >= 19 && y <= 21;

          if (!isTopDoor && !isBottomDoor && !isLeftDoor && !isRightDoor) {
            tile = 3; // Stone wall
          }
        }

        // Add some interior obstacles (trees and rocks)
        if (x === 10 && y >= 10 && y <= 15) {
          tile = 5; // Tree
        }
        if (x === 40 && y >= 10 && y <= 15) {
          tile = 6; // Snowy tree
        }
        if (x >= 20 && x <= 30 && y === 20) {
          tile = 7; // Rocks
        }

        row.push(tile);
      }
      wallsData.push(row);
    }

    // Create the tilemap (with ground layer)
    const map = scene.make.tilemap({
      data: groundData,
      tileWidth: this.TILE_SIZE,
      tileHeight: this.TILE_SIZE,
      width: mapWidth,
      height: mapHeight,
    });

    // Add the tileset
    const tileset = map.addTilesetImage('winter-tileset', 'winter-tileset', this.TILE_SIZE, this.TILE_SIZE);

    if (!tileset) {
      console.error('Failed to add tileset image');
      throw new Error('Failed to add tileset image');
    }

    // Create ground layer
    const groundLayer = map.createLayer(0, tileset, 0, 0);

    if (!groundLayer) {
      console.error('Failed to create ground layer');
      throw new Error('Failed to create ground layer');
    }

    // Create walls layer from array data
    const wallsLayer = map.createBlankLayer('walls', tileset, 0, 0, mapWidth, mapHeight);

    if (!wallsLayer) {
      console.error('Failed to create walls layer');
      throw new Error('Failed to create walls layer');
    }

    // Populate walls layer with our data
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const tileIndex = wallsData[y][x];
        if (tileIndex !== -1) {
          wallsLayer.putTileAt(tileIndex, x, y);
        }
      }
    }

    // Set collision for wall tiles (tiles 3-7)
    wallsLayer.setCollision([3, 4, 5, 6, 7]);

    console.log('Test room created:', mapWidth, 'x', mapHeight);

    return map;
  }
}
