import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Assets will be loaded here
  }

  create(): void {
    // Add a background
    this.cameras.main.setBackgroundColor('#0a1f3d');

    // Add title text
    const titleText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      'REIGN OF WINTER',
      {
        fontSize: '48px',
        color: '#4a9eff',
        fontStyle: 'bold',
      }
    );
    titleText.setOrigin(0.5);

    // Add subtitle
    const subtitleText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 40,
      'A Zelda-like Action RPG',
      {
        fontSize: '20px',
        color: '#aaaaaa',
      }
    );
    subtitleText.setOrigin(0.5);

    // Add a test sprite (colored rectangle as placeholder player)
    const player = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 60,
      16,
      24,
      0x00ff00
    );

    // Add instruction text
    const instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 150,
      'Phase 0 Complete!\nNext: Add player movement',
      {
        fontSize: '16px',
        color: '#ffffff',
        align: 'center',
      }
    );
    instructionText.setOrigin(0.5);

    // Add version info
    const versionText = this.add.text(
      10,
      this.cameras.main.height - 30,
      'v0.1.0 - Prototype',
      {
        fontSize: '14px',
        color: '#666666',
      }
    );

    console.log('GameScene created successfully!');
    console.log('Phaser version:', Phaser.VERSION);
  }

  update(): void {
    // Game loop will go here
  }
}
