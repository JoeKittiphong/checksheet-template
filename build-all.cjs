const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// List of forms to build
const forms = [
    "FAMB0002V2",
    "FAMB0003_V2",
    "FAMB0004_V3",
    "FAWI0002_V3",
    "FAWI0005_V3",
    "ASSY_PROBLEM",
    "FAWI0006_V3",
    "FAWI0008_V3",
    "FAWI0025_V2",
    "FAWI0026_V2",
    "FAWI0038_V2"
];

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
