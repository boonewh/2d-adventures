import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private readonly speed: number = 160;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Create placeholder texture if it doesn't exist
    if (!scene.textures.exists('player-placeholder')) {
      const graphics = scene.add.graphics();
      graphics.fillStyle(0x00ff00, 1);
      graphics.fillRect(0, 0, 16, 24);
      graphics.generateTexture('player-placeholder', 16, 24);
      graphics.destroy();
    }

    // Create sprite with placeholder texture
    super(scene, x, y, 'player-placeholder');

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Set up keyboard controls
    this.setupControls();

    // Configure physics
    this.setCollideWorldBounds(true);
    this.setDrag(800, 800); // Adds smooth stopping
  }

  private setupControls(): void {
    if (!this.scene.input.keyboard) {
      console.error('Keyboard input not available');
      return;
    }

    // Arrow keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // WASD keys
    this.wasd = {
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update(): void {
    if (!this.cursors || !this.wasd) return;

    // Reset velocity
    let velocityX = 0;
    let velocityY = 0;

    // Check inputs (both WASD and Arrow keys)
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      velocityX = -this.speed;
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      velocityX = this.speed;
    }

    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      velocityY = -this.speed;
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      velocityY = this.speed;
    }

    // Normalize diagonal movement (prevents faster diagonal speed)
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707; // 1/√2
      velocityY *= 0.707;
    }

    // Apply velocity
    this.setVelocity(velocityX, velocityY);
  }
}
