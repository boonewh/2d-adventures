import Phaser from 'phaser';
import { Player } from '../entities/player';
import { IceSlime } from '../entities/ice-slime';
import { SpriteGenerator } from '../utils/sprite-generator';
import { TilemapGenerator } from '../utils/tilemap-generator';

export class GameScene extends Phaser.Scene {
  private player?: Player;
  private map?: Phaser.Tilemaps.Tilemap;
  private enemies: IceSlime[] = [];
  private healthText?: Phaser.GameObjects.Text;

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
    SpriteGenerator.createIceSlimeSprite(this);

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
    const wallsLayer = this.map.getLayer('walls')?.tilemapLayer;
    if (wallsLayer) {
      this.physics.add.collider(this.player, wallsLayer);
    } else {
      console.error('Walls layer not found');
    }

    // Spawn some enemies
    this.spawnEnemies(worldWidth, worldHeight);

    // Set up collisions for enemies
    if (wallsLayer) {
      this.enemies.forEach(enemy => {
        this.physics.add.collider(enemy, wallsLayer);
      });
    }

    // Set up combat system
    this.setupCombat();

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Version info (bottom-left corner, fixed to camera)
    this.add.text(
      10,
      this.cameras.main.height - 20,
      'v0.1.0 - Phase 3: Combat',
      {
        fontSize: '12px',
        color: '#666666',
      }
    ).setScrollFactor(0);

    // Health display (top-left corner, fixed to camera)
    this.healthText = this.add.text(
      10,
      10,
      '',
      {
        fontSize: '16px',
        color: '#ff0000',
        fontStyle: 'bold',
      }
    ).setScrollFactor(0);
    this.updateHealthDisplay();

    console.log('GameScene created successfully!');
    console.log('Map size:', worldWidth, 'x', worldHeight);
  }

  private spawnEnemies(worldWidth: number, worldHeight: number): void {
    if (!this.player) return;

    // Spawn 5 ice slimes at random positions
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(100, worldWidth - 100);
      const y = Phaser.Math.Between(100, worldHeight - 100);
      const slime = new IceSlime(this, x, y, this.player);
      this.enemies.push(slime);
    }

    console.log(`Spawned ${this.enemies.length} enemies`);
  }

  private setupCombat(): void {
    if (!this.player) return;

    // Add collision between player and enemies (pushback)
    this.enemies.forEach(enemy => {
      this.physics.add.collider(this.player!, enemy, () => {
        // Push player and enemy apart
        if (!enemy.isDead()) {
          this.player!.takeDamage(enemy.damage);

          // Knockback effect
          const angle = Phaser.Math.Angle.Between(
            enemy.x,
            enemy.y,
            this.player!.x,
            this.player!.y
          );
          this.player!.setVelocity(
            Math.cos(angle) * 200,
            Math.sin(angle) * 200
          );
        }
      });

      // Player attack hits enemies (using overlap for hitbox check)
      this.physics.add.overlap(
        this.player!,
        enemy,
        () => {
          // Check if player is attacking
          const hitbox = this.player!.getAttackHitbox();
          if (hitbox) {
            this.physics.add.overlap(hitbox, enemy, () => {
              enemy.takeDamage(this.player!.damage);

              // Knockback enemy when hit
              const angle = Phaser.Math.Angle.Between(
                this.player!.x,
                this.player!.y,
                enemy.x,
                enemy.y
              );
              enemy.setVelocity(
                Math.cos(angle) * 150,
                Math.sin(angle) * 150
              );
            });
          }
        }
      );
    });
  }

  private updateHealthDisplay(): void {
    if (!this.player || !this.healthText) return;

    // Create heart display (♥ symbols)
    const hearts = '♥'.repeat(this.player.health);
    const emptyHearts = '♡'.repeat(this.player.maxHealth - this.player.health);
    this.healthText.setText(hearts + emptyHearts);
  }

  update(): void {
    // Update player
    if (this.player) {
      this.player.update();
    }

    // Update enemies
    this.enemies.forEach(enemy => {
      if (!enemy.isDead()) {
        enemy.update();
      }
    });

    // Remove destroyed enemies from array
    this.enemies = this.enemies.filter(enemy => enemy.active);

    // Update health display
    this.updateHealthDisplay();
  }
}
