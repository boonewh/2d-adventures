# Reign of Winter Game - Step-by-Step Implementation Plan

This document provides a detailed, ordered checklist for building the Reign of Winter Zelda-like action RPG from scratch to MVP completion.

**Reference**: See [CLAUDE.md](CLAUDE.md) for development rules and guidelines.

---

## Phase 0: Pre-Development Setup

### Step 0.1: Environment Preparation
- [ ] Ensure Node.js (v18+) and npm are installed
- [ ] Install Git for version control
- [ ] Download and install Tiled Map Editor (https://www.mapeditor.org/)
- [ ] Set up Vercel account at vercel.com
- [ ] Install VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

### Step 0.2: Project Initialization
- [ ] Create project directory structure
- [ ] Initialize npm project (`npm init -y`)
- [ ] Install core dependencies:
  - `npm install phaser`
  - `npm install -D vite typescript`
  - `npm install -D @types/node`
- [ ] Create `tsconfig.json` with strict mode enabled
- [ ] Create `vite.config.ts` for Phaser optimization
- [ ] Create basic `index.html` entry point
- [ ] Create `src/main.ts` as application entry
- [ ] Add scripts to `package.json`:
  - `"dev": "vite"`
  - `"build": "vite build"`
  - `"preview": "vite preview"`

### Step 0.3: Initial Git Setup
- [ ] Initialize git repository (`git init`)
- [ ] Create `.gitignore` (node_modules, dist, .env, etc.)
- [ ] Create initial commit with project skeleton
- [ ] Create GitHub repository
- [ ] Push to GitHub (`git remote add origin ...`)

### Step 0.4: Vercel Deployment Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings (Build Command: `npm run build`, Output Directory: `dist`)
- [ ] Deploy initial skeleton to verify hosting works
- [ ] Test deployed URL in browser
- [ ] **Checkpoint**: Can access blank page at Vercel URL

---

## Phase 1: Foundation - Basic Game Loop (Days 1-3)

### Step 1.1: Create First Phaser Scene
- [ ] Create `src/scenes/` directory
- [ ] Create `src/scenes/game-scene.ts`
- [ ] Implement basic `GameScene` class extending `Phaser.Scene`
- [ ] Add `preload()`, `create()`, and `update()` methods
- [ ] Register scene in `src/main.ts`
- [ ] Configure Phaser game instance (800x600 resolution, Arcade physics)
- [ ] **Test**: See blank Phaser canvas in browser at `localhost:5173`

### Step 1.2: Add Test Graphics
- [ ] In `GameScene.create()`: Add colored rectangle as temporary player sprite
- [ ] Add grid or background color to verify rendering
- [ ] Add text displaying "Reign of Winter - Prototype"
- [ ] **Test**: See colored shapes on screen
- [ ] **Commit**: `feat: add basic Phaser game scene with test graphics`

### Step 1.3: Implement Player Movement (Keyboard)
- [ ] Create `src/entities/` directory
- [ ] Create `src/entities/player.ts`
- [ ] Create `Player` class extending `Phaser.Physics.Arcade.Sprite`
- [ ] Add player sprite to scene (colored rectangle for now)
- [ ] Enable arcade physics on player
- [ ] Implement WASD/Arrow key movement in `update()`
- [ ] Set player velocity based on key inputs (speed: 160)
- [ ] Add velocity drag to stop smoothly
- [ ] **Test**: Move colored rectangle around screen with keyboard
- [ ] **Commit**: `feat: implement basic player keyboard movement`

### Step 1.4: Add Camera Follow
- [ ] Configure main camera to follow player
- [ ] Set camera bounds (e.g., 1600x1200 world)
- [ ] Create larger world space (background or grid)
- [ ] **Test**: Camera follows player smoothly as they move
- [ ] **Commit**: `feat: add camera following player`

### Step 1.5: Deploy and Test
- [ ] Run `npm run build` locally to ensure no errors
- [ ] Push to GitHub
- [ ] Verify Vercel auto-deploys
- [ ] Test production build at Vercel URL
- [ ] **Checkpoint**: Can move a rectangle around on deployed site

---

## Phase 2: Tilemap and Environment (Days 4-7)

### Step 2.1: Create First Tilemap in Tiled
- [ ] Create `public/assets/tilesets/` directory
- [ ] Download or create simple 16x16 winter tileset (grass, snow, trees, walls)
  - Recommended: Use placeholder from OpenGameArt or Kenney.nl
- [ ] Save tileset PNG to `public/assets/tilesets/winter-tileset.png`
- [ ] Open Tiled, create new map (20x15 tiles, 16x16 tile size)
- [ ] Import tileset into Tiled
- [ ] Create layers: "ground", "walls", "decorations"
- [ ] Paint simple test room (snow ground, tree walls)
- [ ] Add collision property to "walls" layer
- [ ] Export as JSON to `public/assets/maps/test-room.json`
- [ ] **Commit**: `art: add basic winter tileset and test room map`

### Step 2.2: Load Tilemap in Phaser
- [ ] In `GameScene.preload()`: Load tilemap JSON and tileset image
- [ ] In `GameScene.create()`: Create tilemap from JSON
- [ ] Add tileset image to map
- [ ] Create layers (ground, walls, decorations) in correct order
- [ ] **Test**: See tilemap rendered in game
- [ ] **Commit**: `feat: load and render Tiled map in game scene`

### Step 2.3: Add Collision Detection
- [ ] Set collision on "walls" layer by property
- [ ] Add collision between player and walls layer
- [ ] Adjust player collider size if needed
- [ ] **Test**: Player cannot walk through walls
- [ ] **Commit**: `feat: add collision between player and walls`

### Step 2.4: Replace Player Rectangle with Sprite
- [ ] Create or download 16x24 pixel player sprite (4-direction walking)
  - Recommended: Simple character, 4-8 frames total
- [ ] Save to `public/assets/sprites/player.png`
- [ ] Create sprite sheet JSON or use Phaser's frame config
- [ ] Load player sprite in `preload()`
- [ ] Replace rectangle with sprite in `Player` class
- [ ] Create walk animations (down, up, left, right)
- [ ] Play appropriate animation based on movement direction
- [ ] Add idle frame when stopped
- [ ] **Test**: Player sprite animates when moving
- [ ] **Commit**: `art: add player sprite and walking animations`

### Step 2.5: Camera and World Bounds
- [ ] Set world bounds to match tilemap size
- [ ] Constrain player to world bounds
- [ ] Set camera bounds to world bounds
- [ ] Add camera deadzone for smoother following (optional)
- [ ] **Test**: Camera doesn't show area outside map
- [ ] **Commit**: `feat: configure camera and world bounds`

---

## Phase 3: Combat System Basics (Days 8-12)

### Step 3.1: Player Attack Animation
- [ ] Create or download player attack sprite frames (4 directions, 3-5 frames each)
- [ ] Save to `public/assets/sprites/player-attack.png`
- [ ] Load attack sprite sheet in `preload()`
- [ ] Create attack animations (attack-down, attack-up, attack-left, attack-right)
- [ ] Add attack input detection (Spacebar or Z key)
- [ ] Play attack animation on input
- [ ] Prevent movement during attack
- [ ] Return to idle after attack completes
- [ ] **Test**: Player plays attack animation when key pressed
- [ ] **Commit**: `feat: add player attack animation`

### Step 3.2: Create Attack Hitbox
- [ ] Create `src/entities/hitbox.ts`
- [ ] Create invisible sprite/rectangle as hitbox
- [ ] Position hitbox in front of player based on facing direction
- [ ] Enable hitbox for ~300ms during attack animation
- [ ] Disable hitbox after attack
- [ ] Add debug rectangle to visualize hitbox (toggle with key)
- [ ] **Test**: Hitbox appears briefly in front of player during attack
- [ ] **Commit**: `feat: add attack hitbox system`

### Step 3.3: Create Basic Enemy
- [ ] Create `src/entities/enemy.ts`
- [ ] Create simple `Enemy` class extending `Phaser.Physics.Arcade.Sprite`
- [ ] Create or download 16x16 slime/wolf enemy sprite (2-4 frames)
- [ ] Save to `public/assets/sprites/slime.png`
- [ ] Load enemy sprite in `preload()`
- [ ] Add enemy to scene with idle animation
- [ ] Give enemy health (e.g., 3 HP)
- [ ] Display enemy on map
- [ ] **Test**: Enemy appears and animates on screen
- [ ] **Commit**: `feat: add basic enemy entity`

### Step 3.4: Enemy AI - Patrol and Chase
- [ ] Implement simple patrol behavior (move back and forth or random walk)
- [ ] Add detection radius around enemy (e.g., 150 pixels)
- [ ] Calculate distance to player each frame
- [ ] If player in range: move toward player (chase state)
- [ ] If player out of range: return to patrol
- [ ] Update enemy facing direction based on movement
- [ ] **Test**: Enemy patrols, then chases player when nearby
- [ ] **Commit**: `feat: implement enemy AI patrol and chase behavior`

### Step 3.5: Damage System
- [ ] Add `takeDamage(amount)` method to `Player` and `Enemy` classes
- [ ] Add collision detection between attack hitbox and enemies
- [ ] When hitbox overlaps enemy: call `enemy.takeDamage(1)`
- [ ] Play hurt animation/flash on enemy
- [ ] Add knockback to enemy when hit
- [ ] Add invincibility frames (300ms) to prevent multi-hits
- [ ] Destroy enemy sprite when health reaches 0
- [ ] **Test**: Attacking enemy damages and eventually kills it
- [ ] **Commit**: `feat: implement damage system for enemies`

### Step 3.6: Enemy Attacks Player
- [ ] Add attack range check for enemy (e.g., 20 pixels)
- [ ] When in range: trigger enemy attack (animation or simple contact)
- [ ] Add collision between enemy and player
- [ ] Call `player.takeDamage(1)` on collision
- [ ] Add invincibility frames to player (1000ms)
- [ ] Play hurt animation/flash on player
- [ ] Add knockback to player when hit
- [ ] **Test**: Enemy damages player on contact
- [ ] **Commit**: `feat: implement enemy attacks and player damage`

---

## Phase 4: UI and Health System (Days 13-15)

### Step 4.1: Create Health Display
- [ ] Create `src/ui/` directory
- [ ] Create `src/ui/health-display.ts`
- [ ] Create `HealthDisplay` class
- [ ] Create or download heart sprite (full, half, empty)
- [ ] Save to `public/assets/ui/hearts.png`
- [ ] Load heart sprite in `preload()`
- [ ] Display 3 hearts in top-left corner (fixed to camera)
- [ ] **Test**: See 3 full hearts on screen
- [ ] **Commit**: `feat: add health display UI`

### Step 4.2: Connect Health to Player
- [ ] Add `maxHealth` and `currentHealth` properties to Player (e.g., 6 = 3 hearts)
- [ ] Update `HealthDisplay` when player takes damage
- [ ] Change heart sprites based on current health (full → half → empty)
- [ ] **Test**: Hearts decrease when player is damaged
- [ ] **Commit**: `feat: connect health display to player health`

### Step 4.3: Player Death and Respawn
- [ ] Detect when player health reaches 0
- [ ] Play death animation (or fade out)
- [ ] Pause game for 1 second
- [ ] Reset player position to spawn point
- [ ] Restore player health to max
- [ ] Respawn all enemies in room (for now)
- [ ] **Test**: Player dies, then respawns at start with full health
- [ ] **Commit**: `feat: implement player death and respawn`

### Step 4.4: Add Simple HUD
- [ ] Create `src/ui/hud.ts`
- [ ] Add black/translucent bar at top of screen
- [ ] Display health in HUD
- [ ] Add placeholder for item display (show later)
- [ ] Ensure HUD is fixed to camera (not world)
- [ ] **Test**: HUD stays in place when camera moves
- [ ] **Commit**: `feat: add basic HUD layout`

---

## Phase 5: Doors and Room Transitions (Days 16-18)

### Step 5.1: Create Second Room Map
- [ ] In Tiled, create new map `test-room-2.json` (different layout)
- [ ] Use same tileset
- [ ] Design simple room (different from first)
- [ ] Export to `public/assets/maps/test-room-2.json`
- [ ] **Commit**: `art: add second test room map`

### Step 5.2: Add Door Object Layer in Tiled
- [ ] In both maps, create "objects" layer
- [ ] Add rectangle object where door should be
- [ ] Set custom properties:
  - `type: "door"`
  - `targetMap: "test-room-2"` (or "test-room")
  - `targetX: 100`
  - `targetY: 100`
- [ ] Export updated maps
- [ ] **Commit**: `art: add door objects to maps`

### Step 5.3: Implement Door Detection
- [ ] In `GameScene.create()`: Parse object layer for doors
- [ ] Create trigger zones (invisible sprites) at door locations
- [ ] Add overlap detection between player and door triggers
- [ ] When player overlaps door: log door info to console
- [ ] **Test**: Console logs when player touches door area
- [ ] **Commit**: `feat: add door trigger detection`

### Step 5.4: Implement Scene Transition
- [ ] When door triggered: fade out screen (camera fade effect)
- [ ] Stop player movement
- [ ] After fade: restart scene with new map parameter
- [ ] Load new map based on door's `targetMap` property
- [ ] Position player at `targetX`, `targetY`
- [ ] Fade in screen
- [ ] **Test**: Walking through door loads new room
- [ ] **Commit**: `feat: implement room transition system`

### Step 5.5: Bidirectional Doors
- [ ] Add return door in second room pointing back to first room
- [ ] Test transitioning back and forth
- [ ] Ensure player spawns in correct position in both rooms
- [ ] **Test**: Can move between rooms in both directions
- [ ] **Commit**: `feat: add bidirectional door system`

---

## Phase 6: Inventory System (Days 19-22)

### Step 6.1: Create Item Data Structure
- [ ] Create `src/data/` directory
- [ ] Create `src/data/items.ts`
- [ ] Define `Item` interface (id, name, type, description, sprite)
- [ ] Define `ItemType` enum (KEY, CONSUMABLE, EQUIPMENT, QUEST)
- [ ] Create sample items array (small-key, boss-key, health-potion)
- [ ] **Commit**: `feat: define item data structure`

### Step 6.2: Create Inventory Manager
- [ ] Create `src/systems/` directory
- [ ] Create `src/systems/inventory.ts`
- [ ] Create `Inventory` class with methods:
  - `addItem(itemId: string)`
  - `removeItem(itemId: string)`
  - `hasItem(itemId: string): boolean`
  - `getItems(): Item[]`
- [ ] Store inventory in array or map
- [ ] **Test**: Can add/remove items via console commands
- [ ] **Commit**: `feat: create inventory management system`

### Step 6.3: Create Collectible Items
- [ ] Create `src/entities/item-pickup.ts`
- [ ] Create `ItemPickup` class extending `Phaser.Physics.Arcade.Sprite`
- [ ] Load item sprites (key, potion, etc.) in `preload()`
- [ ] Place item pickup on map
- [ ] Add overlap detection between player and item
- [ ] On overlap: add to inventory, destroy sprite, play sound effect (if available)
- [ ] **Test**: Walking over item collects it
- [ ] **Commit**: `feat: add collectible item pickups`

### Step 6.4: Display Inventory UI
- [ ] Create `src/ui/inventory-display.ts`
- [ ] Show item icons in HUD (top-right corner)
- [ ] Display currently equipped/active item
- [ ] Update display when items are collected
- [ ] **Test**: Collected items appear in HUD
- [ ] **Commit**: `feat: add inventory display to HUD`

### Step 6.5: Locked Doors with Keys
- [ ] Add `locked: true` property to door in Tiled
- [ ] Add `requiredKey: "small-key"` property
- [ ] Check if player has key when touching locked door
- [ ] If no key: show "Locked!" message, prevent transition
- [ ] If has key: consume key, unlock door, allow transition
- [ ] **Test**: Cannot pass locked door without key
- [ ] **Commit**: `feat: implement locked doors and key system`

---

## Phase 7: Dialogue and NPCs (Days 23-25)

### Step 7.1: Create Dialogue Data
- [ ] Create `src/data/dialogues.ts`
- [ ] Define `Dialogue` interface (id, speaker, lines, portrait?)
- [ ] Create sample dialogues (villager greeting, quest hint, etc.)
- [ ] **Commit**: `feat: define dialogue data structure`

### Step 7.2: Create Dialogue Box UI
- [ ] Create `src/ui/dialogue-box.ts`
- [ ] Create semi-transparent box at bottom of screen
- [ ] Add text area with word wrapping
- [ ] Add speaker name display
- [ ] Add "continue" indicator (arrow or blinking cursor)
- [ ] Implement text scrolling/typing effect (optional but nice)
- [ ] **Test**: Can display test dialogue on screen
- [ ] **Commit**: `feat: create dialogue box UI component`

### Step 7.3: Create NPC Entity
- [ ] Create `src/entities/npc.ts`
- [ ] Create `NPC` class extending `Phaser.Physics.Arcade.Sprite`
- [ ] Load NPC sprite (villager, merchant, etc.)
- [ ] Place NPC on map
- [ ] Add interaction zone around NPC
- [ ] Detect when player is near and presses interact key (E or Enter)
- [ ] **Test**: Can detect interaction with NPC
- [ ] **Commit**: `feat: add NPC entity with interaction detection`

### Step 7.4: Connect Dialogue to NPCs
- [ ] Store dialogue ID in NPC properties
- [ ] When player interacts: show dialogue box
- [ ] Display dialogue text line by line
- [ ] Advance dialogue with key press (Enter/Space)
- [ ] Close dialogue box when complete
- [ ] Prevent player movement during dialogue
- [ ] **Test**: Can talk to NPC and read dialogue
- [ ] **Commit**: `feat: connect dialogue system to NPCs`

### Step 7.5: Quest Hint System
- [ ] Add special dialogue that gives hints
- [ ] Create dialogue for "Old Mother" NPC hinting about winter portal
- [ ] Place NPC in starting room
- [ ] **Test**: Player can get quest information from NPC
- [ ] **Commit**: `feat: add quest hint dialogue to NPC`

---

## Phase 8: Save and Load System (Days 26-28)

### Step 8.1: Define Save Data Structure
- [ ] Create `src/systems/save-manager.ts`
- [ ] Define `SaveData` interface:
  - `playerHealth: number`
  - `playerPosition: { x, y, mapName }`
  - `inventory: string[]`
  - `unlockedDoors: string[]`
  - `defeatedEnemies: string[]`
  - `timestamp: number`
- [ ] **Commit**: `feat: define save data structure`

### Step 8.2: Implement Save Function
- [ ] Create `SaveManager` class with `save()` method
- [ ] Gather current game state (player health, position, inventory, etc.)
- [ ] Serialize to JSON
- [ ] Store in `localStorage` with key "reignOfWinter_save"
- [ ] Add "Save Game" button in pause menu (or auto-save)
- [ ] **Test**: Can save game state to localStorage (check dev tools)
- [ ] **Commit**: `feat: implement save game functionality`

### Step 8.3: Implement Load Function
- [ ] Add `load()` method to `SaveManager`
- [ ] Read from `localStorage`
- [ ] Parse JSON to `SaveData`
- [ ] Restore player health, position, inventory
- [ ] Load correct map
- [ ] Return `null` if no save exists
- [ ] **Test**: Can load saved game state
- [ ] **Commit**: `feat: implement load game functionality`

### Step 8.4: Add Continue/New Game Menu
- [ ] Create `src/scenes/menu-scene.ts`
- [ ] Create main menu with title and options
- [ ] Add "Continue" button (disabled if no save)
- [ ] Add "New Game" button (starts fresh)
- [ ] Set menu as initial scene in `main.ts`
- [ ] "Continue" loads save and starts `GameScene`
- [ ] "New Game" starts `GameScene` from beginning
- [ ] **Test**: Menu shows both options correctly
- [ ] **Commit**: `feat: add main menu with continue/new game options`

### Step 8.5: Auto-Save on Door Transition
- [ ] Auto-save game state when entering new room
- [ ] Show brief "Saving..." notification (optional)
- [ ] **Test**: Game auto-saves when moving between rooms
- [ ] **Commit**: `feat: implement auto-save on room transitions`

---

## Phase 9: First Dungeon - Heldren Village (Days 29-35)

### Step 9.1: Design Heldren Village Map
- [ ] In Tiled, create `heldren-village.json`
- [ ] Size: ~40x30 tiles
- [ ] Design village layout: houses, inn, path, trees
- [ ] Add 3-4 buildings (inn, armory, houses)
- [ ] Place 2-3 NPCs (Old Mother, innkeeper, guard)
- [ ] Add door to Border Wood (south exit)
- [ ] Export map
- [ ] **Commit**: `art: create Heldren village map`

### Step 9.2: Add Village NPCs and Dialogue
- [ ] Create dialogues for each NPC
- [ ] Old Mother: warns about strange winter, hints at Border Wood
- [ ] Innkeeper: welcomes player, offers rest (heal to full HP)
- [ ] Guard: worried about missing patrol
- [ ] Place NPCs on map with interaction zones
- [ ] **Test**: Can talk to all NPCs in village
- [ ] **Commit**: `feat: add Heldren village NPCs and dialogues`

### Step 9.3: Design Border Wood Entrance
- [ ] Create `border-wood-entrance.json` map
- [ ] Snow-covered forest theme
- [ ] Add some weak enemies (1-2 wolves)
- [ ] Add door back to village (north)
- [ ] Add door to dungeon proper (south or east)
- [ ] **Test**: Can enter Border Wood from village
- [ ] **Commit**: `art: create Border Wood entrance area`

### Step 9.4: Design Border Wood Dungeon (4-6 Rooms)
- [ ] Create room maps:
  - `dungeon-room-1.json` - Entry hall with enemies
  - `dungeon-room-2.json` - Puzzle room (locked door + key)
  - `dungeon-room-3.json` - Combat challenge (multiple enemies)
  - `dungeon-room-4.json` - Treasure room (health upgrade or item)
  - `dungeon-boss-room.json` - Boss arena
- [ ] Connect rooms with doors
- [ ] Add enemies to each room (2-4 per room)
- [ ] Hide small-key in room 1 or 2
- [ ] Lock door to boss room (requires small-key)
- [ ] **Commit**: `art: create Border Wood dungeon rooms`

### Step 9.5: Add Dungeon Enemies
- [ ] Place enemies on dungeon maps
- [ ] Use 2-3 enemy types (slime, wolf, ice sprite)
- [ ] Set appropriate enemy counts (easier near start, harder near boss)
- [ ] Test difficulty balance
- [ ] **Commit**: `feat: populate dungeon with enemies`

---

## Phase 10: Boss Battle (Days 36-40)

### Step 10.1: Create Boss Entity
- [ ] Create `src/entities/boss.ts`
- [ ] Create `Boss` class extending `Enemy`
- [ ] Create or download boss sprite (ice elemental, winter wolf, etc.)
- [ ] Size: 32x32 or larger
- [ ] Give boss high health (e.g., 12 HP)
- [ ] Load boss sprite in `preload()`
- [ ] **Commit**: `art: add boss sprite`

### Step 10.2: Implement Boss AI
- [ ] Create boss state machine (IDLE, CHASE, ATTACK, SPECIAL)
- [ ] CHASE: move toward player (slower than small enemies)
- [ ] ATTACK: melee lunge attack when in range
- [ ] SPECIAL: special attack pattern (ice shards, area freeze, etc.)
  - Example: Shoot 3 projectiles in spread pattern
- [ ] Add attack cooldowns and telegraphing (wind-up animations)
- [ ] **Test**: Boss exhibits attack patterns
- [ ] **Commit**: `feat: implement boss AI and attack patterns`

### Step 10.3: Create Boss Projectiles (Optional)
- [ ] If boss has ranged attack: create `src/entities/projectile.ts`
- [ ] Create projectile sprite (ice shard, magic bolt)
- [ ] Spawn projectiles from boss
- [ ] Add movement and collision detection
- [ ] Damage player on hit
- [ ] **Test**: Boss shoots projectiles that damage player
- [ ] **Commit**: `feat: add boss projectile attacks`

### Step 10.4: Boss Room Setup
- [ ] Place boss in boss room map
- [ ] Lock door when player enters (prevent escape)
- [ ] Add health bar UI for boss (top of screen)
- [ ] Play boss music when battle starts (if available)
- [ ] **Test**: Boss battle feels challenging but fair
- [ ] **Commit**: `feat: set up boss room and battle initiation`

### Step 10.5: Boss Defeat and Reward
- [ ] When boss health reaches 0: play death animation
- [ ] Unlock door to exit
- [ ] Spawn reward item (boss key or quest item)
- [ ] Display victory message
- [ ] Stop boss music, return to normal music
- [ ] Add door to "portal room" (final room of dungeon)
- [ ] **Test**: Defeating boss unlocks progression
- [ ] **Commit**: `feat: implement boss defeat and rewards`

---

## Phase 11: Polish and Audio (Days 41-45)

### Step 11.1: Add Sound Effects
- [ ] Download or create SFX:
  - Player attack swing
  - Enemy hit
  - Player hurt
  - Door open
  - Item pickup
  - Menu select/confirm
- [ ] Save to `public/assets/audio/sfx/`
- [ ] Load SFX in `preload()`
- [ ] Play appropriate SFX on events
- [ ] Add volume controls
- [ ] **Test**: SFX play at correct times
- [ ] **Commit**: `audio: add sound effects`

### Step 11.2: Add Background Music
- [ ] Download or create music tracks:
  - Village theme (calm, peaceful)
  - Dungeon theme (tense, atmospheric)
  - Boss theme (intense, dramatic)
- [ ] Save to `public/assets/audio/music/`
- [ ] Load music in `preload()`
- [ ] Play appropriate music per scene/room
- [ ] Implement music looping
- [ ] Add fade-in/fade-out transitions
- [ ] Add music volume control
- [ ] **Test**: Music changes appropriately between areas
- [ ] **Commit**: `audio: add background music`

### Step 11.3: Add Particle Effects
- [ ] Add hit spark particles when enemy is damaged
- [ ] Add snow particles in outdoor areas (Border Wood)
- [ ] Add magic particles for boss attacks
- [ ] Add death particles when enemies die
- [ ] Keep effects subtle (don't obscure gameplay)
- [ ] **Test**: Particles enhance visual feedback
- [ ] **Commit**: `feat: add particle effects for combat and atmosphere`

### Step 11.4: Screen Effects
- [ ] Add screen shake on player damage (subtle)
- [ ] Add screen shake on boss attacks (medium)
- [ ] Add flash effect on player hurt (red tint)
- [ ] Add freeze frame on boss defeat (pause for 500ms)
- [ ] Add smooth fade transitions between rooms
- [ ] **Test**: Screen effects feel impactful but not nauseating
- [ ] **Commit**: `feat: add screen effects for impact`

### Step 11.5: UI Polish
- [ ] Add background panel to dialogue box
- [ ] Add border/frame to HUD elements
- [ ] Improve font readability (use bitmap font or custom font)
- [ ] Add item collection popup (small notification)
- [ ] Add pause menu (ESC key) with resume/save/quit options
- [ ] **Test**: UI is clear and visually appealing
- [ ] **Commit**: `feat: polish UI elements`

---

## Phase 12: Testing and Bug Fixing (Days 46-50)

### Step 12.1: Comprehensive Playthrough
- [ ] Play through entire game from start to finish
- [ ] Note all bugs, issues, and rough spots
- [ ] Create bug list in GitHub Issues or tracking document
- [ ] Prioritize bugs (critical, major, minor, polish)

### Step 12.2: Fix Critical Bugs
- [ ] Fix game-breaking bugs (crashes, softlocks)
- [ ] Fix collision issues (player getting stuck)
- [ ] Fix save/load corruption issues
- [ ] Ensure boss is beatable
- [ ] **Commit**: `fix: resolve critical bugs`

### Step 12.3: Balance Tuning
- [ ] Adjust enemy damage if too hard/easy
- [ ] Adjust player damage if combat is too slow/fast
- [ ] Adjust health pickups and max health
- [ ] Adjust enemy spawn counts in rooms
- [ ] Tune boss health and attack frequency
- [ ] **Test**: Game feels challenging but fair
- [ ] **Commit**: `balance: tune combat difficulty`

### Step 12.4: Performance Optimization
- [ ] Check FPS in browser dev tools
- [ ] If below 60 FPS: identify bottlenecks
- [ ] Optimize particle count
- [ ] Use object pooling for projectiles/enemies
- [ ] Reduce overdraw (unnecessary sprite overlaps)
- [ ] **Test**: Runs at 60 FPS on target hardware
- [ ] **Commit**: `perf: optimize game performance`

### Step 12.5: Browser Compatibility Testing
- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test on mobile browser (Chrome Mobile)
- [ ] Fix any browser-specific issues
- [ ] **Commit**: `fix: browser compatibility issues`

---

## Phase 13: Final Deployment and Documentation (Days 51-52)

### Step 13.1: Create README.md
- [ ] Add project title and description
- [ ] Add screenshot or GIF of gameplay
- [ ] List features
- [ ] Add "How to Play" section (controls, objective)
- [ ] Add credits section (Paizo, OGL, asset sources)
- [ ] Add development setup instructions
- [ ] Add link to live demo (Vercel URL)
- [ ] **Commit**: `docs: create comprehensive README`

### Step 13.2: Add OGL License and Credits
- [ ] Create `LICENSE.md` with OGL text
- [ ] Add in-game credits screen (accessible from main menu)
- [ ] Credit Paizo and Reign of Winter Adventure Path
- [ ] Credit asset sources (OpenGameArt, Kenney, etc.)
- [ ] Add "Inspired by Pathfinder's Reign of Winter" to title screen
- [ ] **Commit**: `docs: add OGL license and credits`

### Step 13.3: Final Build and Deployment
- [ ] Run `npm run build` locally
- [ ] Test production build with `npm run preview`
- [ ] Fix any build warnings or errors
- [ ] Push final code to GitHub `main` branch
- [ ] Verify Vercel auto-deploys
- [ ] Test deployed version thoroughly
- [ ] **Checkpoint**: Game is live and playable at Vercel URL

### Step 13.4: Configure Custom Domain (Optional)
- [ ] Purchase domain (e.g., `reignofwinter.com`) if desired
- [ ] Configure domain in Vercel dashboard
- [ ] Update DNS settings
- [ ] Verify HTTPS certificate
- [ ] **Test**: Game accessible at custom domain

### Step 13.5: Announce and Share
- [ ] Share game link with friends/testers
- [ ] Post on game dev communities (optional)
- [ ] Gather feedback for future updates
- [ ] Create GitHub release tag (v1.0.0)
- [ ] **Celebrate**: MVP is complete!

---

## Post-MVP: Future Expansion Ideas

Once MVP is stable and tested, consider these expansion phases:

### Expansion Phase 1: Act 2 - The Shackled Hut
- [ ] Create Whitethrone city area
- [ ] Add new enemy types (winter guards, ice witches)
- [ ] Design new dungeon (Dancing Hut exterior)
- [ ] Implement new boss (White Witch lieutenant)
- [ ] Add new items and upgrades

### Expansion Phase 2: Combat Enhancements
- [ ] Add second weapon type (bow, magic staff)
- [ ] Add weapon switching
- [ ] Add special abilities or magic spells
- [ ] Add shield/blocking mechanic
- [ ] Add dodge roll

### Expansion Phase 3: Advanced Systems
- [ ] Add quest log UI
- [ ] Add minimap
- [ ] Add merchant/shop system
- [ ] Add equipment upgrades
- [ ] Add collectibles/achievements

### Expansion Phase 4: Remaining Acts
- [ ] Act 3: Maiden, Mother, Crone (Iobaria)
- [ ] Act 4: The Frozen Stars (Triaxus)
- [ ] Act 5: Rasputin Must Die! (1918 Siberia)
- [ ] Act 6: The Witch Queen's Revenge (Dancing Hut interior)

---

## Development Velocity Tracking

Track your progress to estimate completion dates:

| Phase | Estimated Days | Start Date | End Date | Status |
|-------|---------------|------------|----------|--------|
| Phase 0: Setup | 1 | | | ⬜ Not Started |
| Phase 1: Foundation | 3 | | | ⬜ Not Started |
| Phase 2: Tilemap | 4 | | | ⬜ Not Started |
| Phase 3: Combat | 5 | | | ⬜ Not Started |
| Phase 4: UI/Health | 3 | | | ⬜ Not Started |
| Phase 5: Doors | 3 | | | ⬜ Not Started |
| Phase 6: Inventory | 4 | | | ⬜ Not Started |
| Phase 7: Dialogue | 3 | | | ⬜ Not Started |
| Phase 8: Save/Load | 3 | | | ⬜ Not Started |
| Phase 9: Dungeon | 7 | | | ⬜ Not Started |
| Phase 10: Boss | 5 | | | ⬜ Not Started |
| Phase 11: Polish | 5 | | | ⬜ Not Started |
| Phase 12: Testing | 5 | | | ⬜ Not Started |
| Phase 13: Deploy | 2 | | | ⬜ Not Started |
| **TOTAL** | **~52 days** | | | |

**Note**: This assumes ~2-4 hours of focused development per day. Adjust estimates based on your actual development speed.

---

## Next Step

You are currently at: **Phase 0: Pre-Development Setup**

The first actionable step is:
**Step 0.1: Environment Preparation - Install Node.js, Git, Tiled Map Editor, and set up Vercel account**

Once ready, proceed to **Step 0.2: Project Initialization**

---

*Remember to reference [CLAUDE.md](CLAUDE.md) for development rules throughout this process!*
