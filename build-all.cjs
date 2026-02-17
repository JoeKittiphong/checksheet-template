const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// List of forms to build
const formsPath = path.join(__dirname, 'forms.cjs');
let forms = [];

if (fs.existsSync(formsPath)) {
    try {
        forms = require('./forms.cjs');
    } catch (err) {
        console.error("Error loading forms.cjs:", err.message);
        process.exit(1);
    }
} else {
    console.error("forms.cjs not found!");
    process.exit(1);
}



console.log("🚀 Starting Bulk Build Process...\n");

forms.forEach((formName, index) => {
    console.log(`[${index + 1}/${forms.length}] Building form: ${formName}...`);

    try {
        // Set environment variable and run build
        // For Windows (cmd), we use 'set VAR=val && command'
        // For cross-platform support better to use cross-env, but assuming Windows native here as per user request

        // Using child_process.execSync with env option is cleaner
        execSync('npm run build', {
            stdio: 'inherit',
            env: { ...process.env, FORM_NAME: formName }
        });

        console.log(`✅ Build success: ${formName}\n`);
    } catch (error) {
        console.error(`❌ Build failed: ${formName}`);
        console.error(error.message);
        // Continue to next form or exit? 
        // Usually better to let user know but continue if independent
    }
});

console.log("✨ All builds completed!");
