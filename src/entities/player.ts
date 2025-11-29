import Phaser from 'phaser';
import { Damageable, Attacker } from '../types/combat';

export class Player extends Phaser.Physics.Arcade.Sprite implements Damageable, Attacker {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private attackKey?: Phaser.Input.Keyboard.Key;
  private readonly speed: number = 160;
  private lastDirection: 'up' | 'down' | 'left' | 'right' = 'down';

  // Combat properties
  public health: number = 6;
  public maxHealth: number = 6;
  public damage: number = 1;
  private isAttacking: boolean = false;
  private attackHitbox?: Phaser.Physics.Arcade.Sprite;
  private invulnerable: boolean = false;

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

    // Attack key (Spacebar)
    this.attackKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  // Damageable interface implementation
  takeDamage(amount: number): void {
    if (this.invulnerable || this.isDead()) return;

    this.health = Math.max(0, this.health - amount);
    console.log(`Player took ${amount} damage. Health: ${this.health}/${this.maxHealth}`);

    // Visual feedback (flash red)
    this.setTint(0xff0000);
    this.scene.time.delayedCall(200, () => {
      this.clearTint();
    });

    // Temporary invulnerability (1 second)
    this.invulnerable = true;
    this.scene.time.delayedCall(1000, () => {
      this.invulnerable = false;
    });

    if (this.isDead()) {
      this.onDeath();
    }
  }

  isDead(): boolean {
    return this.health <= 0;
  }

  private onDeath(): void {
    console.log('Player died!');
    // TODO: Game over screen, respawn, etc.
    this.setVelocity(0, 0);
    this.setAlpha(0.5);
  }

  // Attacker interface implementation
  attack(): void {
    if (this.isAttacking || this.isDead()) return;

    this.isAttacking = true;
    console.log('Player attacks!');

    // Create attack hitbox in front of player
    const hitboxSize = 20;
    let hitboxX = this.x;
    let hitboxY = this.y;

    switch (this.lastDirection) {
      case 'up':
        hitboxY -= hitboxSize;
        break;
      case 'down':
        hitboxY += hitboxSize;
        break;
      case 'left':
        hitboxX -= hitboxSize;
        break;
      case 'right':
        hitboxX += hitboxSize;
        break;
    }

    // Create visual sword slash effect
    const slashGraphics = this.scene.add.graphics();
    slashGraphics.lineStyle(3, 0xffff00, 1); // Yellow slash

    // Draw slash arc based on direction
    if (this.lastDirection === 'up' || this.lastDirection === 'down') {
      const offsetY = this.lastDirection === 'up' ? -15 : 15;
      slashGraphics.beginPath();
      slashGraphics.arc(this.x, this.y + offsetY, 15, -Math.PI / 4, Math.PI / 4, false);
      slashGraphics.strokePath();
    } else {
      const offsetX = this.lastDirection === 'left' ? -15 : 15;
      slashGraphics.beginPath();
      slashGraphics.arc(this.x + offsetX, this.y, 15, -Math.PI / 2, Math.PI / 2, false);
      slashGraphics.strokePath();
    }

    // Fade out slash effect
    this.scene.tweens.add({
      targets: slashGraphics,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        slashGraphics.destroy();
      }
    });

    // Create temporary attack hitbox
    this.attackHitbox = this.scene.physics.add.sprite(hitboxX, hitboxY, '');
    this.attackHitbox.setSize(hitboxSize, hitboxSize);
    this.attackHitbox.setVisible(false);
    (this.attackHitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

    // Remove hitbox after attack animation
    this.scene.time.delayedCall(300, () => {
      if (this.attackHitbox) {
        this.attackHitbox.destroy();
        this.attackHitbox = undefined;
      }
      this.isAttacking = false;
    });
  }

  getAttackHitbox(): Phaser.Physics.Arcade.Sprite | undefined {
    return this.attackHitbox;
  }

  update(): void {
    if (!this.cursors || !this.wasd || !this.attackKey) return;

    // Don't move while dead
    if (this.isDead()) return;

    // Check for attack input
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      this.attack();
    }

    // Can't move while attacking
    if (this.isAttacking) {
      this.setVelocity(0, 0);
      return;
    }

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
