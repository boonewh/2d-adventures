# CLAUDE.md - Reign of Winter Game Development Rules

This document contains critical rules and guidelines for developing the Reign of Winter Zelda-like action RPG. All AI assistants and developers working on this project must follow these rules.

---

## Project Overview

**Project Name**: Reign of Winter: A Zelda-Style Action RPG
**Genre**: 2D Top-down Action RPG
**Setting**: Paizo's Reign of Winter Adventure Path (OGL content)
**Target Platform**: Web browsers via Vercel deployment
**Inspiration**: The Legend of Zelda (Link to the Past, Link's Awakening)

---

## Core Development Principles

### 1. KISS - Keep It Simple, Stupid
- **No over-engineering**: Build only what is needed for the current feature
- **No premature optimization**: Make it work, then make it fast if needed
- **No speculative features**: Don't build for hypothetical future requirements
- Three similar lines of code is better than a premature abstraction

### 2. Iterative Development
- Build one small system at a time and test it thoroughly
- Get player movement working before adding combat
- Get one room working before building a dungeon
- Get one dungeon working before creating multiple acts
- **Always have a playable build**

### 3. Test-Driven Approach
- Every new feature must be immediately testable in the browser
- Use Vite's hot reload to test changes in real-time
- Deploy to Vercel frequently to ensure production builds work
- If something breaks, fix it before moving to the next feature

### 4. Minimal Viable Features
- Start with the simplest implementation that works
- Example: Single weapon type before weapon switching
- Example: Walking animation before attack animations
- Example: One enemy AI pattern before complex behaviors

---

## Technical Stack Rules

### Required Technologies
- **Game Engine**: Phaser 3 (v3.80+)
- **Build Tool**: Vite (v5+)
- **Language**: TypeScript (strict mode enabled)
- **Hosting**: Vercel
- **Map Editor**: Tiled Map Editor

### Forbidden Technologies (for this project)
- **No React/Vue/Angular**: Phaser handles rendering
- **No game framework switching**: Commit to Phaser
- **No heavy backend**: Keep it serverless (Vercel functions only)
- **No complex state management libs**: Phaser's scene data is sufficient

### File Structure Standards
```
src/
├── scenes/          # All Phaser scenes (one file per scene)
├── entities/        # Player, enemies, NPCs (one class per file)
├── systems/         # Game systems (combat, inventory, dialogue)
├── data/            # JSON data (items, enemies, dialogues)
├── utils/           # Helper functions (keep minimal)
├── types/           # TypeScript type definitions
└── main.ts          # Entry point (keep under 50 lines)

public/
├── assets/
│   ├── sprites/     # PNG sprite sheets
│   ├── tilesets/    # PNG tileset images
│   ├── audio/       # MP3/OGG audio files
│   └── maps/        # Tiled JSON exports
└── index.html       # Minimal HTML shell
```

---

## Code Quality Rules

### TypeScript Standards
- **Always use strict mode**: No implicit any
- **Define types for all public APIs**: Parameters, return values, interfaces
- **Use enums for constants**: Item types, enemy states, scene keys
- **Prefer interfaces over classes**: For data structures

### Naming Conventions
- **Classes**: PascalCase (`PlayerCharacter`, `FireEnemy`)
- **Files**: kebab-case (`player-character.ts`, `fire-enemy.ts`)
- **Variables/Functions**: camelCase (`movePlayer`, `currentHealth`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_HEALTH`, `TILE_SIZE`)
- **Scenes**: PascalCase with "Scene" suffix (`GameScene`, `MenuScene`)

### Function/Method Rules
- **Keep functions under 50 lines**: If longer, break into smaller functions
- **One responsibility per function**: Do one thing well
- **Avoid side effects**: Pure functions where possible
- **Document complex logic**: Comments for "why", not "what"

### Class Design
- **Prefer composition over inheritance**: Use Phaser's game object composition
- **Keep classes focused**: Single Responsibility Principle
- **No god objects**: Player class shouldn't handle inventory, rendering, AND combat

---

## Game Design Rules

### Scope Management
- **Start with Act 1 only**: Heldren village and Border Wood dungeon
- **One dungeon at a time**: Fully complete before starting the next
- **Core mechanics first**: Movement → Combat → Inventory → Puzzles
- **No feature creep**: Stick to Zelda-like core gameplay

### MVP Feature Set (Must Have for v1.0)
1. Player movement (8-direction or 4-direction)
2. One weapon type (sword/melee)
3. Basic enemy AI (patrol, chase, attack)
4. Health system (hearts display)
5. One complete dungeon (4-6 rooms)
6. Door/transition system
7. Basic inventory (key items only)
8. Simple dialogue system
9. One boss battle
10. Save/load functionality

### Deferred Features (Post-MVP)
- Multiple weapon types
- Magic/ranged attacks
- Complex puzzle mechanics
- Companion system
- Crafting system
- Multiple acts/dungeons
- Advanced enemy AI
- Cutscenes/story sequences

### Art Style Guidelines
- **Pixel art aesthetic**: 16-bit style (SNES/GBA era)
- **Tile size**: 16x16 pixels (standard for Zelda-likes)
- **Sprite size**: Multiples of 16 (16x16, 16x24, 32x32)
- **Color palette**: Limited palette per area (winter: blues/whites)
- **Animation frames**: 2-4 frames for walk cycles, 3-5 for attacks

---

## Performance Rules

### Asset Optimization
- **Sprite sheets**: Combine sprites into atlases (use TexturePacker or Phaser tools)
- **Image format**: PNG for sprites/tiles, WebP for backgrounds if supported
- **Audio**: MP3 for music, OGG for SFX (under 100KB per file)
- **Map size**: Keep rooms under 50x50 tiles
- **Total assets**: Target under 50MB for initial load

### Code Performance
- **Object pooling**: Reuse bullets, particles, enemies instead of creating new
- **Collision optimization**: Use Phaser's collision groups, not brute force checks
- **Rendering**: Let Phaser handle it, don't manually draw unless necessary
- **Update loops**: Keep `update()` methods lightweight (< 5ms per frame)

### Vercel Deployment
- **Static export**: Build to static files (no server-side rendering)
- **Asset CDN**: All assets served from Vercel's Edge CDN
- **Build size**: Keep under 100MB total deployment size
- **Caching**: Leverage Vercel's automatic caching for assets

---

## Content Rules (OGL Compliance)

### What We CAN Use from Reign of Winter
- Story structure and plot beats
- Character names (Baba Yaga, Elvanna, Rasputin, etc.)
- Location names (Irrisen, Whitethrone, Heldren, etc.)
- Monster concepts (adapted to pixel art)
- General setting and lore

### What We CANNOT Use
- Official Paizo artwork or assets
- Direct text from the adventure modules
- Paizo's specific stat blocks (adapt to our game system)
- Trademarked Pathfinder/Golarion terms without OGL notice

### Attribution Requirements
- Include OGL license text in credits
- Credit Paizo and Reign of Winter in "About" section
- Add "Inspired by Pathfinder's Reign of Winter Adventure Path" to title screen
- Link to Paizo website in credits

---

## Git Workflow Rules

### Commit Messages
- **Format**: `type: brief description`
- **Types**: `feat`, `fix`, `refactor`, `art`, `audio`, `docs`, `test`
- **Examples**:
  - `feat: add player sword attack animation`
  - `fix: collision detection for doors`
  - `art: add winter tileset for Border Wood`

### Branch Strategy
- **main**: Always deployable to Vercel
- **dev**: Integration branch for features
- **feature/**: Individual features (`feature/player-combat`, `feature/dungeon-1`)
- Merge to `dev` when tested, merge `dev` to `main` for releases

### Before Each Commit
1. Test the feature in browser
2. Check for console errors
3. Verify build completes (`npm run build`)
4. Ensure no TypeScript errors
5. Update relevant documentation

---

## Testing & Quality Assurance

### Manual Testing Checklist
- [ ] Player can move in all directions without getting stuck
- [ ] Attacks hit enemies and deal damage
- [ ] Enemies detect and chase player correctly
- [ ] Health system works (damage taken, death state)
- [ ] Doors/transitions load correct scenes
- [ ] Save/load preserves game state
- [ ] No console errors during 5 minutes of gameplay
- [ ] Game runs at 60 FPS on average hardware

### Browser Testing
- **Primary**: Chrome/Edge (Chromium)
- **Secondary**: Firefox
- **Mobile**: Chrome Mobile, Safari iOS (touch controls)

### Deployment Testing
- After each Vercel deploy, test production build
- Verify all assets load correctly
- Check for CORS or loading issues
- Test on different network speeds

---

## Development Phases & Milestones

### Phase 1: Foundation (Target: Week 2)
- [ ] Project setup (Phaser + Vite + TypeScript)
- [ ] Player character moves on screen
- [ ] Camera follows player
- [ ] Basic tilemap loads from Tiled
- [ ] Deploy to Vercel successfully

### Phase 2: Core Combat (Target: Week 4)
- [ ] Player attack animation and hitbox
- [ ] Basic enemy (slime/wolf) with AI
- [ ] Health system (player and enemy)
- [ ] Enemy death and respawn
- [ ] UI: Health hearts display

### Phase 3: Systems (Target: Week 6)
- [ ] Inventory system (key items)
- [ ] Door/transition system
- [ ] Dialogue system (text boxes)
- [ ] Save/load (localStorage)
- [ ] UI: Inventory display

### Phase 4: First Dungeon (Target: Week 8)
- [ ] Heldren village (safe zone, NPCs)
- [ ] Border Wood dungeon (4-6 rooms)
- [ ] 2-3 enemy types
- [ ] Simple puzzles (switches, keys)
- [ ] Boss battle (winter portal guardian)

### Phase 5: Polish (Target: Week 10)
- [ ] Audio (music + SFX)
- [ ] Particle effects
- [ ] Screen transitions
- [ ] Balance tuning
- [ ] Bug fixing

---

## Decision Log

Document major technical decisions here with rationale:

### Decision 1: Phaser 3 over Pixi.js
- **Date**: 2025-11-29
- **Rationale**: Phaser provides complete game framework (physics, scenes, input) while Pixi.js is just a renderer. Building a game engine from scratch on Pixi would take significantly longer.
- **Trade-offs**: Slightly larger bundle size, but saves weeks of development time.

### Decision 2: TypeScript over JavaScript
- **Date**: 2025-11-29
- **Rationale**: Type safety prevents common bugs (typos, wrong parameter types). IDE autocomplete speeds up development. Easier to refactor later.
- **Trade-offs**: Initial setup time, but pays off immediately in developer experience.

### Decision 3: Tiled Map Editor
- **Date**: 2025-11-29
- **Rationale**: Industry standard, excellent Phaser integration, visual editing is faster than code-based maps.
- **Trade-offs**: Need to learn Tiled, but it's intuitive and well-documented.

---

## Resources & References

### Documentation
- [Phaser 3 Official Docs](https://photonstorm.github.io/phaser3-docs/)
- [Phaser 3 Examples](https://phaser.io/examples)
- [Tiled Map Editor Docs](https://doc.mapeditor.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tutorials
- [Making Your First Phaser 3 Game](https://phaser.io/tutorials/making-your-first-phaser-3-game)
- [Zelda-like Tutorial Series](https://www.youtube.com/results?search_query=phaser+zelda+tutorial)

### Reign of Winter Resources
- [PathfinderWiki: Reign of Winter](https://pathfinderwiki.com/wiki/Reign_of_Winter)
- [Paizo Store Page](https://paizo.com/reignOfWinter)

### Art Resources
- [OpenGameArt.org](https://opengameart.org/) - Free game assets
- [itch.io Game Assets](https://itch.io/game-assets/free) - Free sprites and tilesets
- [Kenney.nl](https://kenney.nl/) - Free game assets

---

## Communication Guidelines

### When Working with AI Assistants
- Provide specific, focused tasks (e.g., "Add sword attack to player" not "Make the game")
- Reference this CLAUDE.md file when rules are unclear
- Ask for code review before committing major features
- Request step-by-step plans for complex features

### Code Review Checklist
- [ ] Follows TypeScript strict mode
- [ ] Matches file naming conventions
- [ ] Functions under 50 lines
- [ ] No magic numbers (use constants)
- [ ] Performance considerations addressed
- [ ] Tested in browser

---

## Common Pitfalls to Avoid

1. **Don't build all 6 acts at once**: Focus on Act 1, expand later
2. **Don't create custom physics**: Use Phaser's Arcade Physics
3. **Don't hardcode values**: Use constants and configuration files
4. **Don't skip Vercel testing**: Deploy early and often
5. **Don't ignore performance**: Monitor FPS from the start
6. **Don't reinvent the wheel**: Use Phaser's built-in features
7. **Don't commit untested code**: Always test before pushing
8. **Don't mix tabs and spaces**: Use 2-space indentation (configured in prettier)

---

## Success Criteria

### MVP is Complete When:
- [ ] Can play through Heldren village to Border Wood dungeon end
- [ ] Combat feels responsive and fun
- [ ] Runs at 60 FPS on modern browsers
- [ ] Save/load preserves progress
- [ ] Deployed to Vercel with custom domain (optional)
- [ ] No critical bugs in main gameplay loop
- [ ] 15-30 minutes of gameplay content

### Ready for Expansion When:
- [ ] MVP is stable for 1 week with no major bugs
- [ ] Code is well-documented
- [ ] Asset pipeline is established
- [ ] Performance headroom for more content (still hitting 60 FPS)

---

## Version History

- **v1.0** (2025-11-29): Initial CLAUDE.md created with core development rules

---

*This document is a living guide. Update it as we learn what works and what doesn't during development.*
