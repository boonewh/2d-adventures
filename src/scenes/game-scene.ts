import Phaser from 'phaser';
import { Player } from '../entities/player';
import { SpriteGenerator } from '../utils/sprite-generator';
import { TilemapGenerator } from '../utils/tilemap-generator';

export class GameScene extends Phaser.Scene {
  private player?: Player;
  private map?: Phaser.Tilemaps.Tilemap;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Assets will be loaded here
  }

  create(): void {
    // Generate player sprites and animations
    SpriteGenerator.createPlayerSprites(this);
    SpriteGenerator.createPlayerAnimations(this);

    // Generate tileset
    TilemapGenerator.createWinterTileset(this);

    // Create the map
    this.map = TilemapGenerator.createTestRoom(this);

    // Calculate world size from map
    const worldWidth = this.map.widthInPixels;
    const worldHeight = this.map.heightInPixels;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Create player at center of world
    this.player = new Player(this, worldWidth / 2, worldHeight / 2);

    // Get the walls layer for collision
    const wallsLayer = this.map.getLayer(1)?.tilemapLayer;
    if (wallsLayer) {
      this.physics.add.collider(this.player, wallsLayer);
    }

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Version info (bottom-left corner, fixed to camera)
    this.add.text(
      10,
      this.cameras.main.height - 20,
      'v0.1.0 - Phase 2',
      {
        fontSize: '12px',
        color: '#666666',
      }
    ).setScrollFactor(0);

    console.log('GameScene created successfully!');
    console.log('Map size:', worldWidth, 'x', worldHeight);
  }

  update(): void {
    // Update player
    if (this.player) {
      this.player.update();
    }
  }
}
