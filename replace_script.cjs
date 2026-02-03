const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src/checksheet/FAWI0025_V2');
const targetStr = 'FAWI0006_V3';
const replaceStr = 'FAWI0025_V2';

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            processDirectory(fullPath);
        } else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.json'))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(targetStr)) {
                const newContent = content.split(targetStr).join(replaceStr);
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

processDirectory(targetDir);
console.log('Replacement complete.');
