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
  private lastDirection: 'up' | 'down' | 'left' | 'right' = 'down';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Start with down-facing idle sprite
    super(scene, x, y, 'player-down-0');

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
      this.lastDirection = 'left';
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      velocityX = this.speed;
      this.lastDirection = 'right';
    }

    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      velocityY = -this.speed;
      this.lastDirection = 'up';
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      velocityY = this.speed;
      this.lastDirection = 'down';
    }

    // Normalize diagonal movement (prevents faster diagonal speed)
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707; // 1/√2
      velocityY *= 0.707;
    }

    // Apply velocity
    this.setVelocity(velocityX, velocityY);

    // Update animations based on movement
    this.updateAnimation(velocityX, velocityY);
  }

  private updateAnimation(velocityX: number, velocityY: number): void {
    const isMoving = velocityX !== 0 || velocityY !== 0;

    if (isMoving) {
      // Play walking animation based on direction
      // Prioritize vertical movement for diagonals
      if (Math.abs(velocityY) > Math.abs(velocityX)) {
        if (velocityY < 0) {
          this.play('walk-up', true);
        } else {
          this.play('walk-down', true);
        }
      } else {
        if (velocityX < 0) {
          this.play('walk-left', true);
        } else {
          this.play('walk-right', true);
        }
      }
    } else {
      // Play idle animation based on last direction
      this.play(`idle-${this.lastDirection}`, true);
    }
  }
}
