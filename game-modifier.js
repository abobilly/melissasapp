// Admin Panel Integration Script
// This script allows the admin panel to modify the actual game source code

class GameCodeModifier {
    constructor() {
        this.gameFilePath = 'butterfly-waterfall.html';
        this.isVSCodeEnvironment = this.detectVSCodeEnvironment();
    }

    detectVSCodeEnvironment() {
        // Check if we're in VS Code Live Server or local development
        return window.location.protocol === 'http:' && 
               (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    }

    async modifyGameConfig(config) {
        if (this.isVSCodeEnvironment) {
            return await this.modifyViaAPI(config);
        } else {
            return this.generatePatch(config);
        }
    }

    async modifyViaAPI(config) {
        try {
            // This would require a simple Node.js server running alongside VS Code
            const response = await fetch('/api/update-game-config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config)
            });

            if (response.ok) {
                return { success: true, message: 'Game source code updated successfully!' };
            } else {
                throw new Error('Failed to update game code');
            }
        } catch (error) {
            console.warn('API not available, falling back to patch generation');
            return this.generatePatch(config);
        }
    }

    generatePatch(config) {
        // Generate code modifications that can be applied manually
        const patches = this.createCodePatches(config);
        
        return {
            success: true,
            message: 'Code patches generated! Apply manually in VS Code.',
            patches: patches,
            instructions: this.generateInstructions(patches)
        };
    }

    createCodePatches(config) {
        const patches = [];

        // Aunt settings patches
        if (config.auntQuoteFreq) {
            patches.push({
                description: 'Update aunt quote frequency',
                searchFor: /(\d+000 \+ Math\.random\(\) \* \d+000).*aunt quote cycle/,
                replaceWith: `${config.auntQuoteFreq * 1000} + Math.random() * ${config.auntQuoteFreq * 500}); // Every ${config.auntQuoteFreq}-${config.auntQuoteFreq * 1.5} seconds`,
                file: 'butterfly-waterfall.html',
                lineHint: 'Around line 1380 in startAuntQuoteCycle function'
            });
        }

        // Cousin MLM frequency patch
        if (config.mlmFrequency) {
            const frequency = config.mlmFrequency / 100;
            patches.push({
                description: 'Update cousin MLM dialogue frequency',
                searchFor: /if \(Math\.random\(\) < 0\.\d+\) \{.*MLM/,
                replaceWith: `if (Math.random() < ${frequency}) { // ${config.mlmFrequency}% chance every cycle (more frequent)`,
                file: 'butterfly-waterfall.html',
                lineHint: 'Around line 1340 in startCousinQuoteCycle function'
            });
        }

        // Add more patches for other settings...
        return patches;
    }

    generateInstructions(patches) {
        let instructions = "📝 Manual Code Update Instructions:\n\n";
        
        patches.forEach((patch, index) => {
            instructions += `${index + 1}. ${patch.description}\n`;
            instructions += `   File: ${patch.file}\n`;
            instructions += `   Location: ${patch.lineHint}\n`;
            instructions += `   Find: ${patch.searchFor}\n`;
            instructions += `   Replace with: ${patch.replaceWith}\n\n`;
        });

        return instructions;
    }
}

// Export for use in admin panel
window.GameCodeModifier = GameCodeModifier;