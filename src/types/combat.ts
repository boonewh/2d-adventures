/**
 * Combat system type definitions
 */

export interface Damageable {
  health: number;
  maxHealth: number;
  takeDamage(amount: number): void;
  isDead(): boolean;
}

export interface Attacker {
  damage: number;
  attack(): void;
}

export enum DamageType {
  MELEE = 'melee',
  RANGED = 'ranged',
  MAGIC = 'magic',
}

export interface DamageInfo {
  amount: number;
  type: DamageType;
  source: Phaser.GameObjects.GameObject;
}
