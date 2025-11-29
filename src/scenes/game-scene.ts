import Phaser from 'phaser';
import { Player } from '../entities/player';

export class GameScene extends Phaser.Scene {
  private player?: Player;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Assets will be loaded here
  }

  create(): void {
    // Set up larger world bounds for movement
    const worldWidth = 1600;
    const worldHeight = 1200;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Add a background
    this.cameras.main.setBackgroundColor('#0a1f3d');

    // Add title text (fixed to camera)
    const titleText = this.add.text(
      400,
      100,
      'REIGN OF WINTER',
      {
        fontSize: '48px',
        color: '#4a9eff',
        fontStyle: 'bold',
      }
    );
    titleText.setOrigin(0.5);
    titleText.setScrollFactor(0); // Fixed to camera

    // Add subtitle (fixed to camera)
    const subtitleText = this.add.text(
      400,
      160,
      'A Zelda-like Action RPG',
      {
        fontSize: '20px',
        color: '#aaaaaa',
      }
    );
    subtitleText.setOrigin(0.5);
    subtitleText.setScrollFactor(0);

    // Create player at center of world
    this.player = new Player(this, worldWidth / 2, worldHeight / 2);

    // Add instruction text (fixed to camera)
    const instructionText = this.add.text(
      400,
      350,
      'Use WASD or Arrow Keys to move!',
      {
        fontSize: '16px',
        color: '#ffffff',
        align: 'center',
      }
    );
    instructionText.setOrigin(0.5);
    instructionText.setScrollFactor(0);

    // Add version info (fixed to camera)
    this.add.text(
      10,
      570,
      'v0.1.0 - Phase 1: Movement',
      {
        fontSize: '14px',
        color: '#666666',
      }
    ).setScrollFactor(0);

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    console.log('GameScene created successfully!');
    console.log('Phaser version:', Phaser.VERSION);
    console.log('Player movement enabled!');
  }

  update(): void {
    // Update player
    if (this.player) {
      this.player.update();
    }
  }
}
