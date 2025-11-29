import Phaser from 'phaser';
import { Damageable } from '../types/combat';
import { Player } from './player';

export class IceSlime extends Phaser.Physics.Arcade.Sprite implements Damageable {
  public health: number = 3;
  public maxHealth: number = 3;
  public damage: number = 1;

  private player?: Player;
  private detectionRange: number = 150;
  private attackRange: number = 20;
  private speed: number = 80;
  private patrolTimer: number = 0;
  private patrolDirection: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'ice-slime');

    this.player = player;
    this.patrolDirection = new Phaser.Math.Vector2(
      Phaser.Math.Between(-1, 1),
      Phaser.Math.Between(-1, 1)
    ).normalize();

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setDrag(400, 400);
  }

  takeDamage(amount: number): void {
    if (this.isDead()) return;

    this.health = Math.max(0, this.health - amount);
    console.log(`Ice Slime took ${amount} damage. Health: ${this.health}/${this.maxHealth}`);

    // Visual feedback
    this.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => {
      this.clearTint();
    });

    if (this.isDead()) {
      this.onDeath();
    }
  }

  isDead(): boolean {
    return this.health <= 0;
  }

  private onDeath(): void {
    console.log('Ice Slime died!');
    this.setVelocity(0, 0);
    this.setAlpha(0.5);

    // Destroy after fade
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.destroy();
      },
    });
  }

  update(): void {
    if (this.isDead() || !this.player) return;

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    if (distanceToPlayer <= this.detectionRange && !this.player.isDead()) {
      // Chase player
      this.chasePlayer();
    } else {
      // Patrol randomly
      this.patrol();
    }
  }

  private chasePlayer(): void {
    if (!this.player) return;

    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    this.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );
  }

  private patrol(): void {
    this.patrolTimer += this.scene.game.loop.delta;

    // Change direction every 2 seconds
    if (this.patrolTimer > 2000) {
      this.patrolDirection = new Phaser.Math.Vector2(
        Phaser.Math.Between(-1, 1),
        Phaser.Math.Between(-1, 1)
      ).normalize();
      this.patrolTimer = 0;
    }

    const patrolSpeed = this.speed * 0.5;
    this.setVelocity(
      this.patrolDirection.x * patrolSpeed,
      this.patrolDirection.y * patrolSpeed
    );
  }
}
