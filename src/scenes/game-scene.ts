import Phaser from 'phaser';
import { Player } from '../entities/player';
import { SpriteGenerator } from '../utils/sprite-generator';

export class GameScene extends Phaser.Scene {
  private player?: Player;

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

    // Set up larger world bounds for movement
    const worldWidth = 1600;
    const worldHeight = 1200;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Add a background
    this.cameras.main.setBackgroundColor('#0a1f3d');

    // Create player at center of world
    this.player = new Player(this, worldWidth / 2, worldHeight / 2);

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Version info (bottom-left corner, fixed to camera)
    this.add.text(
      10,
      this.cameras.main.height - 20,
      'v0.1.0 - Phase 1',
      {
        fontSize: '12px',
        color: '#666666',
      }
    ).setScrollFactor(0);

    console.log('GameScene created successfully!');
    console.log('Phaser version:', Phaser.VERSION);
  }

  update(): void {
    // Update player
    if (this.player) {
      this.player.update();
    }
  }
}
