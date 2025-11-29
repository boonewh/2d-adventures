import Phaser from 'phaser';

/**
 * Generates a simple programmatic player sprite with walking animations
 * This is a placeholder until we have proper sprite sheets
 */
export class SpriteGenerator {
  /**
   * Creates player sprite textures for all 4 directions with simple animations
   */
  static createPlayerSprites(scene: Phaser.Scene): void {
    const width = 16;
    const height = 24;

    // Colors
    const skinColor = 0xffdbac;
    const hairColor = 0x8b4513;
    const bodyColor = 0x4169e1; // Blue tunic
    const pantsColor = 0x654321;

    // Create textures for each direction and frame
    this.createDownSprites(scene, width, height, skinColor, hairColor, bodyColor, pantsColor);
    this.createUpSprites(scene, width, height, skinColor, hairColor, bodyColor, pantsColor);
    this.createLeftSprites(scene, width, height, skinColor, hairColor, bodyColor, pantsColor);
    this.createRightSprites(scene, width, height, skinColor, hairColor, bodyColor, pantsColor);
  }

  private static createDownSprites(
    scene: Phaser.Scene,
    width: number,
    height: number,
    skin: number,
    hair: number,
    body: number,
    pants: number
  ): void {
    // Frame 0 - Standing
    const g0 = scene.add.graphics();
    this.drawCharacterDown(g0, width, height, skin, hair, body, pants, 0);
    g0.generateTexture('player-down-0', width, height);
    g0.destroy();

    // Frame 1 - Left foot forward
    const g1 = scene.add.graphics();
    this.drawCharacterDown(g1, width, height, skin, hair, body, pants, -1);
    g1.generateTexture('player-down-1', width, height);
    g1.destroy();

    // Frame 2 - Right foot forward
    const g2 = scene.add.graphics();
    this.drawCharacterDown(g2, width, height, skin, hair, body, pants, 1);
    g2.generateTexture('player-down-2', width, height);
    g2.destroy();
  }

  private static drawCharacterDown(
    g: Phaser.GameObjects.Graphics,
    w: number,
    h: number,
    skin: number,
    hair: number,
    body: number,
    pants: number,
    step: number
  ): void {
    const cx = w / 2;

    // Head
    g.fillStyle(skin, 1);
    g.fillRect(cx - 3, 4, 6, 6);

    // Hair
    g.fillStyle(hair, 1);
    g.fillRect(cx - 3, 3, 6, 3);

    // Body
    g.fillStyle(body, 1);
    g.fillRect(cx - 4, 10, 8, 8);

    // Legs
    g.fillStyle(pants, 1);
    if (step === -1) {
      // Left foot forward
      g.fillRect(cx - 3, 18, 3, 5);
      g.fillRect(cx + 1, 18, 2, 6);
    } else if (step === 1) {
      // Right foot forward
      g.fillRect(cx - 2, 18, 2, 6);
      g.fillRect(cx + 1, 18, 3, 5);
    } else {
      // Standing
      g.fillRect(cx - 3, 18, 3, 5);
      g.fillRect(cx + 1, 18, 3, 5);
    }
  }

  private static createUpSprites(
    scene: Phaser.Scene,
    width: number,
    height: number,
    skin: number,
    hair: number,
    body: number,
    pants: number
  ): void {
    // Similar to down but shows back of character
    for (let i = 0; i < 3; i++) {
      const g = scene.add.graphics();
      this.drawCharacterUp(g, width, height, skin, hair, body, pants, i - 1);
      g.generateTexture(`player-up-${i}`, width, height);
      g.destroy();
    }
  }

  private static drawCharacterUp(
    g: Phaser.GameObjects.Graphics,
    w: number,
    h: number,
    skin: number,
    hair: number,
    body: number,
    pants: number,
    step: number
  ): void {
    const cx = w / 2;

    // Hair (back of head)
    g.fillStyle(hair, 1);
    g.fillRect(cx - 3, 3, 6, 7);

    // Body
    g.fillStyle(body, 1);
    g.fillRect(cx - 4, 10, 8, 8);

    // Legs
    g.fillStyle(pants, 1);
    if (step === -1) {
      g.fillRect(cx - 3, 18, 3, 5);
      g.fillRect(cx + 1, 18, 2, 6);
    } else if (step === 1) {
      g.fillRect(cx - 2, 18, 2, 6);
      g.fillRect(cx + 1, 18, 3, 5);
    } else {
      g.fillRect(cx - 3, 18, 3, 5);
      g.fillRect(cx + 1, 18, 3, 5);
    }
  }

  private static createLeftSprites(
    scene: Phaser.Scene,
    width: number,
    height: number,
    skin: number,
    hair: number,
    body: number,
    pants: number
  ): void {
    for (let i = 0; i < 3; i++) {
      const g = scene.add.graphics();
      this.drawCharacterSide(g, width, height, skin, hair, body, pants, i - 1, true);
      g.generateTexture(`player-left-${i}`, width, height);
      g.destroy();
    }
  }

  private static createRightSprites(
    scene: Phaser.Scene,
    width: number,
    height: number,
    skin: number,
    hair: number,
    body: number,
    pants: number
  ): void {
    for (let i = 0; i < 3; i++) {
      const g = scene.add.graphics();
      this.drawCharacterSide(g, width, height, skin, hair, body, pants, i - 1, false);
      g.generateTexture(`player-right-${i}`, width, height);
      g.destroy();
    }
  }

  private static drawCharacterSide(
    g: Phaser.GameObjects.Graphics,
    w: number,
    h: number,
    skin: number,
    hair: number,
    body: number,
    pants: number,
    step: number,
    facingLeft: boolean
  ): void {
    const offset = facingLeft ? -1 : 1;
    const cx = w / 2;

    // Head
    g.fillStyle(skin, 1);
    g.fillRect(cx - 2 + offset, 4, 5, 6);

    // Hair
    g.fillStyle(hair, 1);
    g.fillRect(cx - 2 + offset, 3, 5, 3);

    // Body
    g.fillStyle(body, 1);
    g.fillRect(cx - 3, 10, 7, 8);

    // Legs (walking animation)
    g.fillStyle(pants, 1);
    if (step === -1) {
      g.fillRect(cx - 3, 18, 3, 6);
      g.fillRect(cx + 1, 18, 3, 4);
    } else if (step === 1) {
      g.fillRect(cx - 3, 18, 3, 4);
      g.fillRect(cx + 1, 18, 3, 6);
    } else {
      g.fillRect(cx - 3, 18, 3, 5);
      g.fillRect(cx + 1, 18, 3, 5);
    }
  }

  /**
   * Creates Ice Slime enemy sprite
   */
  static createIceSlimeSprite(scene: Phaser.Scene): void {
    const size = 16;
    const g = scene.add.graphics();

    // Ice blue slime body
    g.fillStyle(0x88ddff, 1);
    g.fillCircle(size / 2, size / 2, 7);

    // Lighter highlight
    g.fillStyle(0xccf0ff, 1);
    g.fillCircle(size / 2 - 2, size / 2 - 2, 3);

    // Eyes
    g.fillStyle(0x000000, 1);
    g.fillCircle(size / 2 - 3, size / 2 - 1, 1);
    g.fillCircle(size / 2 + 3, size / 2 - 1, 1);

    g.generateTexture('ice-slime', size, size);
    g.destroy();

    console.log('Ice Slime sprite created');
  }

  /**
   * Creates animations for the player sprite
   */
  static createPlayerAnimations(scene: Phaser.Scene): void {
    // Walk down
    scene.anims.create({
      key: 'walk-down',
      frames: [
        { key: 'player-down-1' },
        { key: 'player-down-0' },
        { key: 'player-down-2' },
        { key: 'player-down-0' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Walk up
    scene.anims.create({
      key: 'walk-up',
      frames: [
        { key: 'player-up-1' },
        { key: 'player-up-0' },
        { key: 'player-up-2' },
        { key: 'player-up-0' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Walk left
    scene.anims.create({
      key: 'walk-left',
      frames: [
        { key: 'player-left-1' },
        { key: 'player-left-0' },
        { key: 'player-left-2' },
        { key: 'player-left-0' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Walk right
    scene.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'player-right-1' },
        { key: 'player-right-0' },
        { key: 'player-right-2' },
        { key: 'player-right-0' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Idle animations (just first frame)
    scene.anims.create({
      key: 'idle-down',
      frames: [{ key: 'player-down-0' }],
      frameRate: 1,
    });

    scene.anims.create({
      key: 'idle-up',
      frames: [{ key: 'player-up-0' }],
      frameRate: 1,
    });

    scene.anims.create({
      key: 'idle-left',
      frames: [{ key: 'player-left-0' }],
      frameRate: 1,
    });

    scene.anims.create({
      key: 'idle-right',
      frames: [{ key: 'player-right-0' }],
      frameRate: 1,
    });
  }
}
