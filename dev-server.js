const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Enable CORS for VS Code Live Server
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

class GameFileModifier {
    constructor() {
        this.gameFilePath = path.join(__dirname, 'butterfly-waterfall.html');
    }

    async readGameFile() {
        try {
            return await fs.readFile(this.gameFilePath, 'utf8');
        } catch (error) {
            throw new Error(`Could not read game file: ${error.message}`);
        }
    }

    async writeGameFile(content) {
        try {
            await fs.writeFile(this.gameFilePath, content, 'utf8');
            return true;
        } catch (error) {
            throw new Error(`Could not write game file: ${error.message}`);
        }
    }

    async updateGameConfig(config) {
        let content = await this.readGameFile();
        let modified = false;

        // Update aunt quote frequency
        if (config.auntQuoteFreq) {
            const oldPattern = /}, \d+ \+ Math\.random\(\) \* \d+\); \/\/ Every \d+-\d+ seconds/g;
            const newValue = `}, ${config.auntQuoteFreq * 1000} + Math.random() * ${config.auntQuoteFreq * 500}); // Every ${config.auntQuoteFreq}-${Math.ceil(config.auntQuoteFreq * 1.5)} seconds`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        // Update MLM frequency
        if (config.mlmFrequency) {
            const frequency = config.mlmFrequency / 100;
            const oldPattern = /if \(Math\.random\(\) < 0\.\d+\) \{.*70% chance every cycle/g;
            const newValue = `if (Math.random() < ${frequency}) { // ${config.mlmFrequency}% chance every cycle (more frequent)`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        // Update cousin quote interval
        if (config.cousinQuoteInterval) {
            const interval = config.cousinQuoteInterval * 1000;
            const variance = config.cousinQuoteInterval * 500;
            const oldPattern = /\d+000 \+ Math\.random\(\) \* \d+000\);.*Every \d+-\d+ seconds \(much more frequent\)/g;
            const newValue = `${interval} + Math.random() * ${variance}); // Every ${config.cousinQuoteInterval}-${Math.ceil(config.cousinQuoteInterval * 1.5)} seconds (much more frequent)`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        // Update shaking duration
        if (config.shakingDuration) {
            const oldPattern = /\}, \d+000\);.*Shake for \d+ seconds when she says the shaking line!/g;
            const newValue = `}, ${config.shakingDuration * 1000}); // Shake for ${config.shakingDuration} seconds when she says the shaking line!`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        // Update attraction range
        if (config.attractionRange) {
            const oldPattern = /if \(distance < \d+ && distance > 50\) \{/g;
            const newValue = `if (distance < ${config.attractionRange} && distance > 50) {`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        // Update repulsion range
        if (config.repulsionRange) {
            const oldPattern = /if \(distance < \d+\) \{.*Repel cousin away from aunt/g;
            const newValue = `if (distance < ${config.repulsionRange}) {\n                            // Repel cousin away from aunt`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        if (modified) {
            await this.writeGameFile(content);
            return { success: true, message: 'Game file updated successfully!', modified: true };
        } else {
            return { success: true, message: 'No changes needed', modified: false };
        }
    }

    async updateQuotes(config) {
        let content = await this.readGameFile();
        let modified = false;

        // Update aunt quotes
        if (config.auntQuotes && Array.isArray(config.auntQuotes)) {
            const quotesString = config.auntQuotes.map(q => `"${q}"`).join(',\n            ');
            const oldPattern = /const auntRegularQuotes = \[([\s\S]*?)\];/;
            const newValue = `const auntRegularQuotes = [\n            ${quotesString}\n        ];`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        // Update cousin quotes
        if (config.cousinQuotes && Array.isArray(config.cousinQuotes)) {
            const quotesString = config.cousinQuotes.map(q => `"${q}"`).join(',\n            ');
            const oldPattern = /const cousinRegularQuotes = \[([\s\S]*?)\];/;
            const newValue = `const cousinRegularQuotes = [\n            ${quotesString}\n        ];`;
            
            if (oldPattern.test(content)) {
                content = content.replace(oldPattern, newValue);
                modified = true;
            }
        }

        if (modified) {
            await this.writeGameFile(content);
            return { success: true, message: 'Quotes updated successfully!', modified: true };
        } else {
            return { success: true, message: 'No quote changes needed', modified: false };
        }
    }
}

const gameModifier = new GameFileModifier();

// API endpoint to update game configuration
app.post('/api/update-game-config', async (req, res) => {
    try {
        const config = req.body;
        console.log('Received config update request:', config);

        const result = await gameModifier.updateGameConfig(config);
        
        res.json(result);
        console.log('Config update result:', result);
    } catch (error) {
        console.error('Error updating config:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// API endpoint to update quotes
app.post('/api/update-quotes', async (req, res) => {
    try {
        const config = req.body;
        console.log('Received quotes update request');

        const result = await gameModifier.updateQuotes(config);
        
        res.json(result);
        console.log('Quotes update result:', result);
    } catch (error) {
        console.error('Error updating quotes:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Game modifier server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Game Modifier Server running on http://localhost:${PORT}`);
    console.log(`📝 Ready to modify ${path.basename(__dirname)}/butterfly-waterfall.html`);
    console.log(`💡 Use the admin panel to make real-time changes to your source code!`);
});

module.exports = app;