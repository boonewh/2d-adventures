# Tiled Map Editor - Complete Setup Guide

This guide will walk you through creating your first map for the Reign of Winter game, step by step.

---

## Part 1: Generate the Tileset Image (5 minutes)

### Step 1.1: Open the Tileset Generator
1. Navigate to your project folder: `c:\Users\William Boone\Desktop\Websites\2d-adventures\`
2. Find the file: `generate-tileset.html`
3. **Double-click** it to open in your browser (Chrome, Edge, etc.)

### Step 1.2: Download the Tileset
1. You'll see a page titled "Winter Tileset Generator"
2. The tileset will already be generated (you'll see a small pixelated image scaled up)
3. Click the **"Download PNG"** button
4. Save it as: `winter-tileset.png` (it should default to this name)
5. **Move the file** to: `public/assets/tilesets/winter-tileset.png`
   - You'll need to create the folders if they don't exist:
     - Create folder: `public`
     - Inside that, create: `assets`
     - Inside that, create: `tilesets`
   - Then move the PNG there

✅ **Checkpoint**: You should now have the file at `public/assets/tilesets/winter-tileset.png`

---

## Part 2: Create Your First Map in Tiled (10-15 minutes)

### Step 2.1: Open Tiled Map Editor
1. Open **Tiled** application
2. You should see the main window with a menu bar at the top

### Step 2.2: Create a New Map
1. Click **File** → **New** → **New Map...** (or press `Ctrl+N`)
2. You'll see a "New Map" dialog. Set these values:

   **Map:**
   - Orientation: **Orthogonal** (should be default)
   - Tile layer format: **CSV** (or leave as default)
   - Tile render order: **Right Down** (default is fine)

   **Map Size:**
   - Width: **50 tiles**
   - Height: **40 tiles**

   **Tile Size:**
   - Width: **16 px**
   - Height: **16 px**

3. Click **Save As Map...** button at the bottom
4. Navigate to your project: `public/assets/maps/`
   - Create the `maps` folder if it doesn't exist
5. Save as: `test-map.tmx`
6. Click **Save**

✅ **Checkpoint**: You should see a grid of empty tiles

### Step 2.3: Add the Tileset to Your Map
1. Look for the **Tilesets** panel (usually on the right side)
   - If you don't see it: **View** → **Tilesets**
2. In the Tilesets panel, click the **"New Tileset"** button (looks like a document with a star)
3. You'll see "New Tileset" dialog:

   **Type:**
   - Select: **Based on Tileset Image** (should be default)

   **Name:**
   - Type: **winter-tileset**

   **Image:**
   - Click **Browse...** button
   - Navigate to: `public/assets/tilesets/winter-tileset.png`
   - Click **Open**

   **Tile Size:**
   - Width: **16 px** (should auto-detect)
   - Height: **16 px** (should auto-detect)

4. Click **Save As...** button
5. Save it in the same folder as your map: `public/assets/maps/winter-tileset.tsx`
6. Click **Save**

✅ **Checkpoint**: You should now see your tileset (16 small tiles) in the Tilesets panel

### Step 2.4: Understand the Tiles
Your tileset has these tiles (numbered 0-15, left to right, top to bottom):

**Row 1 (Tiles 0-7):**
- 0: Light Snow (walkable)
- 1: Medium Snow (walkable)
- 2: Ice (walkable)
- 3: Stone Wall (BLOCKED)
- 4: Dark Stone (BLOCKED)
- 5: Tree (BLOCKED)
- 6: Snowy Tree (BLOCKED)
- 7: Rock (BLOCKED)

**Row 2 (Tiles 8-15):**
- 8: Dirt Path (walkable)
- 9: Water (walkable for now)
- 10: Deep Snow (walkable)
- 11: Wood Floor (walkable)
- 12-15: Reserved (dark gray)

### Step 2.5: Create the Ground Layer
1. Look for the **Layers** panel (usually on the right, below Tilesets)
   - If you don't see it: **View** → **Layers**
2. You should see one layer called "Tile Layer 1"
3. **Right-click** on "Tile Layer 1" → **Rename Layer**
4. Name it: **ground**
5. Press Enter

### Step 2.6: Paint the Ground
1. Make sure the **ground** layer is selected (highlighted)
2. In the **Tilesets** panel, click on **Tile 0** (light snow, top-left)
3. Look at the toolbar at the top - click the **"Stamp Brush"** tool (looks like a stamp)
   - Or press `B` key
4. **Click and drag** on your map to paint snow tiles
5. Try painting the whole map with tile 0
6. Then try switching to tile 1 or 2 to add variety

**Tip**: Use the **"Bucket Fill"** tool (paint bucket icon, or press `F`) to fill large areas quickly

✅ **Checkpoint**: Your map should now have a snow ground covering most/all of it

### Step 2.7: Create the Walls Layer
1. In the **Layers** panel, click the **"New Layer"** button (looks like a document)
2. Select **Tile Layer**
3. Name it: **walls**
4. Click **OK**
5. Make sure **walls** layer is now selected

### Step 2.8: Paint Some Walls
1. In the Tilesets panel, click **Tile 3** (gray stone wall)
2. Use the Stamp Brush to paint a border around the edge of your map
   - Paint walls along the top
   - Paint walls along the left and right sides
   - Paint walls along the bottom
   - Leave a gap somewhere for an "entrance"

3. Try adding some obstacles in the middle:
   - Use Tile 5 (tree) to paint some trees
   - Use Tile 7 (rocks) to add some rocks
   - Create a simple room or pathway

**Tip**:
- Click and drag to paint multiple tiles
- Hold `Ctrl` and click to erase tiles
- Use the **Eraser** tool (eraser icon, or press `E`) to remove tiles

✅ **Checkpoint**: You should have walls around the edges and some obstacles

### Step 2.9: Add Collision Properties
This is important! We need to tell Phaser which tiles block movement.

1. In the **Tilesets** panel, make sure you can see your winter-tileset
2. Click on **Tile 3** (stone wall)
3. Look for the **Properties** panel (usually bottom-right)
   - If you don't see it: **View** → **Properties**
4. In the Properties panel, click the **"+"** button (Add Property)
5. Set:
   - Name: **collides**
   - Type: **bool** (boolean)
   - Value: **Checked** (true)
6. Click **OK**

7. **Repeat for tiles 4, 5, 6, 7** (all the wall tiles):
   - Select the tile
   - Add property: `collides = true`

✅ **Checkpoint**: Tiles 3-7 should all have a "collides: true" property

### Step 2.10: Save and Export
1. **Save the map**: File → Save (or `Ctrl+S`)
2. **Export to JSON**: File → Export As...
3. Set:
   - File type: **JSON map files (*.tmj *.json)**
   - Navigate to: `public/assets/maps/`
   - Filename: **test-map.json**
4. Click **Save**

✅ **Checkpoint**: You should now have `test-map.json` in `public/assets/maps/`

---

## Part 3: Verify Your Files

Make sure you have these files:

```
public/
└── assets/
    ├── tilesets/
    │   └── winter-tileset.png  ✓
    └── maps/
        ├── test-map.tmx         ✓ (Tiled project file)
        ├── test-map.json        ✓ (Exported for Phaser)
        └── winter-tileset.tsx   ✓ (Tileset definition)
```

---

## Part 4: Let Me Know You're Ready!

Once you've completed these steps, just reply with:
- **"Done!"** or **"Ready!"**

Then I'll:
1. Write the Phaser code to load your map
2. Add collision detection
3. Deploy it so you can see your map in action!

---

## Troubleshooting

### I can't find the Tilesets panel
- Go to **View** → **Tilesets**

### The tileset looks wrong
- Make sure the tile size is 16x16
- Make sure you loaded the correct PNG file

### I made a mistake
- Use **Ctrl+Z** to undo
- Use **Ctrl+Y** to redo

### I want to start over
- File → Close
- File → New → New Map... (start from Step 2.2)

### Tiled won't let me save the tileset
- Make sure the `public/assets/maps/` folder exists
- You might need to create it first

---

## Quick Reference

**Useful Keyboard Shortcuts:**
- `B` - Stamp Brush (paint tiles)
- `E` - Eraser (remove tiles)
- `F` - Bucket Fill (fill areas)
- `S` - Select tool
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+S` - Save
- `Ctrl++` - Zoom in
- `Ctrl+-` - Zoom out

**Layer Order Matters:**
- Layers at the **top** of the list render **on top**
- Layers at the **bottom** render **behind**
- You can drag layers to reorder them

---

Good luck! Take your time and let me know when you're ready for the next step!
