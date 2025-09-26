# Melissa's Adventure - Development Environment

## 🎮 Admin Panel with Real Source Code Integration

This project now includes a comprehensive admin panel that can **actually modify your source code** in real-time!

## 🚀 Quick Start

### Option 1: Simple Testing (Browser Storage Only)
1. Open `admin-panel.html` in your browser
2. Make changes and click "Apply All Changes"
3. Changes save to browser storage (temporary)

### Option 2: Development Mode (Real Source Code Changes)
1. Open VS Code terminal in this folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `admin-panel.html` in your browser
5. Now "Apply All Changes" will modify `butterfly-waterfall.html` directly!

## 📋 What You Can Control

### 👩 Aunt Settings
- Movement speed and frequency
- Quote timing and duration
- Shaking intensity and duration
- Butterfly attraction range
- Cousin repulsion range

### 👥 Cousin Settings
- MLM dialogue frequency
- Quote intervals
- Hover elimination toggle
- Explosion effects

### 🦋 Butterfly Settings
- Initial count
- Movement patterns
- Attraction behaviors

### 💬 Quote Management
- Add/remove aunt quotes
- Add/remove cousin quotes
- Real-time quote updates

## 🔧 Development Workflow

```
Admin Panel → Make Changes → Apply → Game Auto-Updates → Test → Commit
```

### Real-time Development:
1. **Admin Panel**: Adjust settings visually
2. **Apply Changes**: Writes to actual HTML file
3. **Game Refresh**: See changes immediately
4. **Git Commit**: Save permanent changes

## 🛠️ Technical Details

### Files Added:
- `admin-panel.html` - Main admin interface
- `dev-server.js` - Node.js server for file modification
- `game-modifier.js` - Code modification utilities
- `package.json` - Dependencies and scripts

### How It Works:
1. Admin panel sends config to development server
2. Server parses and modifies `butterfly-waterfall.html`
3. Changes are written directly to source code
4. Game can be refreshed to see changes immediately

### Server Endpoints:
- `POST /api/update-game-config` - Updates game mechanics
- `POST /api/update-quotes` - Updates dialogue
- `GET /api/health` - Server status check

## 💡 Pro Tips

### Development Mode Benefits:
- ✅ Changes persist after browser restart
- ✅ Changes are committed to Git
- ✅ Real-time source code modification
- ✅ No manual find/replace needed

### Workflow Recommendations:
1. Use admin panel for experimentation
2. Apply changes you like to source code
3. Test in game immediately
4. Commit when satisfied
5. GitHub Copilot in VS Code for advanced changes

## 🎯 Current Capabilities

### What Gets Modified Automatically:
- Aunt quote frequency and timing
- Cousin MLM dialogue frequency
- Shaking duration and timing
- Attraction/repulsion ranges
- Quote arrays (aunt and cousin)

### Manual Integration Still Needed:
- Complex game mechanics
- New features
- Visual styling changes
- Asset management

## 🚀 Future Enhancements

Potential additions:
- Live preview mode
- Visual game state monitoring
- Asset upload interface
- Advanced animation controls
- Performance monitoring
- A/B testing framework

## 📝 Usage Notes

- Always run `npm run dev` for source code changes
- Check server status with "Check Dev Server" button
- Browser storage is fallback when server offline
- Commit changes regularly to preserve work

Happy game development! 🎉