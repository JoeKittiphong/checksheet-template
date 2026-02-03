const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Program e-checksheet/template-E-checksheet/checksheet-template/src/checksheet/FAWI0008_V3';
const destDir = 'd:/Program e-checksheet/template-E-checksheet/checksheet-template/src/checksheet/FAWI0038_V2';

function copyDir(currentSrc, currentDest) {
    if (!fs.existsSync(currentDest)) {
        fs.mkdirSync(currentDest, { recursive: true });
    }

    const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(currentSrc, entry.name);
        const destName = entry.name.replace('FAWI0008_V3', 'FAWI0038_V2');
        const destPath = path.join(currentDest, destName);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            let content = fs.readFileSync(srcPath, 'utf8');
            // Replace strings
            content = content.replace(/FAWI0008_V3/g, 'FAWI0038_V2');
            fs.writeFileSync(destPath, content);
            console.log(`Copied and updated: ${destPath}`);
        }
    }
}

console.log('Starting copy process...');
try {
    copyDir(srcDir, destDir);
    console.log('Copy complete.');
} catch (error) {
    console.error('Error during copy:', error);
}
