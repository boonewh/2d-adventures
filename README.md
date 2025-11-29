# Reign of Winter

A Zelda-like 2D action RPG inspired by Paizo's **Reign of Winter Adventure Path**, built with Phaser 3, TypeScript, and Vite.

## Overview

Embark on an epic quest to stop the eternal winter spreading across the land. When Baba Yaga, the legendary Witch Queen, mysteriously vanishes, her daughter Elvanna seizes the opportunity to plunge the world into an endless ice age. Your journey will take you from the snow-covered village of Heldren through mystical portals to distant worlds, culminating in a confrontation with the Witch Queen herself.

**Current Status**: Phase 0 Complete - Project Setup ✅

## Features (Planned)

- Classic top-down Zelda-style gameplay
- Real-time combat with sword and magic
- Dungeon exploration with puzzles and secrets
- Six epic acts spanning multiple worlds
- Save/load system
- Atmospheric music and sound effects
- Pixel art aesthetic

## Development

### Prerequisites

- Node.js v18+ (tested on v22.14.0)
- npm v7+
- Git

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game will be available at `http://localhost:5173`

### Project Structure

```
2d-adventures/
├── src/
│   ├── scenes/         # Phaser scenes
│   ├── entities/       # Player, enemies, NPCs
│   ├── systems/        # Game systems (combat, inventory, etc.)
│   ├── data/           # Game data (items, dialogues, etc.)
│   ├── ui/             # UI components
│   ├── utils/          # Helper functions
│   └── main.ts         # Entry point
├── public/
│   └── assets/         # Game assets (sprites, audio, maps)
├── CLAUDE.md           # Development rules and guidelines
├── PLAN.md             # Detailed implementation plan
└── README.md           # This file
```

## Tech Stack

- **Game Engine**: [Phaser 3](https://phaser.io/) - Mature HTML5 game framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast development and builds
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Hosting**: [Vercel](https://vercel.com/) - Automatic deployments
- **Map Editor**: [Tiled](https://www.mapeditor.org/) - Visual map creation

## Roadmap

### Phase 0: Foundation ✅
- [x] Project setup
- [x] Phaser + Vite + TypeScript configuration
- [x] Basic game scene
- [x] Git repository initialization

### Phase 1: Core Gameplay (In Progress)
- [ ] Player movement and animation
- [ ] Camera system
- [ ] Tilemap integration
- [ ] Collision detection

### Phase 2: Combat System
- [ ] Player attacks
- [ ] Enemy AI
- [ ] Health system
- [ ] Combat feedback

### Phase 3: Game Systems
- [ ] Inventory
- [ ] Dialogue
- [ ] Door transitions
- [ ] Save/load

### Phase 4: First Dungeon
- [ ] Heldren village
- [ ] Border Wood dungeon
- [ ] Boss battle

### Phase 5: Polish
- [ ] Audio (music & SFX)
- [ ] Particle effects
- [ ] UI polish
- [ ] Testing and bug fixes

See [PLAN.md](PLAN.md) for the complete step-by-step development plan.

## Credits

### Inspiration
- **Paizo's Reign of Winter Adventure Path** - Story and setting
- **The Legend of Zelda Series** - Gameplay inspiration

### Legal
This project is inspired by content from the Pathfinder Roleplaying Game, which is published under the Open Game License. This is a fan project and is not affiliated with or endorsed by Paizo Publishing.

- Pathfinder and associated marks are trademarks of Paizo Inc.
- Game content is released under the MIT License
- See OGL notice in game credits

## Development Guidelines

This project follows strict development principles to ensure quality and maintainability. See [CLAUDE.md](CLAUDE.md) for:

- Code quality standards
- Development principles
- Tech stack rules
- Performance guidelines
- Common pitfalls to avoid

## Version

**Current Version**: 0.1.0 (Phase 0 - Foundation)

## License

MIT License - See LICENSE file for details

Open Game License content used under the OGL - See in-game credits for OGL notice
