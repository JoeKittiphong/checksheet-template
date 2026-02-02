import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get arguments from command line
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("Usage: node create_checksheet.js <ChecksheetName> <NumberOfPages>");
    console.error("Example: node create_checksheet.js FAWI0002_V3 58");
    process.exit(1);
}

const [checksheetName, pageCountStr] = args;
const totalPages = parseInt(pageCountStr, 10);

if (isNaN(totalPages) || totalPages <= 0) {
    console.error("Error: NumberOfPages must be a positive integer.");
    process.exit(1);
}

// target directory: src/checksheet/<ChecksheetName>
const baseDir = path.join(__dirname, 'src', 'checksheet', checksheetName);
const pagesDir = path.join(baseDir, 'pages');

console.log(`Generating checksheet ${checksheetName} with ${totalPages} pages at ${baseDir}...`);

// Ensure directories exist
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
}

// Helper to parse name and version
function parseChecksheetName(name) {
    // Regex matches common patterns like FAMB0002V2, FAWI0002_V3
    const match = name.match(/^([A-Za-z0-9]+?)[_-]?(V\d+)?$/i);
    return {
        formName: match ? match[1] : name,
        version: match && match[2] ? match[2].toUpperCase() : "V1"
    };
}
const { formName, version } = parseChecksheetName(checksheetName);

// 1. Create meta.json
const metaContent = Object.assign({}, {
    "form_name": formName,
    "version": version.replace(/^V/, ''),
    "department": "DEPARTMENT",
    "model": "MODEL",
    "as_group": "GROUP",
    "checksheet_name": checksheetName
});

fs.writeFileSync(path.join(baseDir, 'meta.json'), JSON.stringify(metaContent, null, 4));
console.log('Created meta.json');

// 2. Create setting.js
const settingFileName = `${checksheetName}-setting.js`;
const settingContent = `export const meta = {
    form_name: "${checksheetName.split('_')[0]}",
    version: "${checksheetName.split('_')[1]}",
    title: "TITLE",
    department: "DEPARTMENT",
    model: "MODEL",
    as_group: "GROUP",
    checksheet_name: "${checksheetName}"
}
export const cover = {
    docNumber: "${formName}",
    version: "${version}",
    dateOfIssue: new Date().toISOString().split('T')[0],
    approvalDate: new Date().toISOString().split('T')[0],
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: '${formName}',
    releaseNo: '${version.replace(/^V/, '')}',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 58,
    date: "14 Feb 2025",
    model: 'MODEL',
    group: 'GROUP'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
`;

fs.writeFileSync(path.join(baseDir, settingFileName), settingContent);
console.log(`Created ${settingFileName}`);

// 3. Create Main Component (ChecksheetName.jsx)
const mainComponentContent = `import React from "react";
import ChecksheetMaster from "@/components/ChecksheetMaster";
import { meta, apiEndpoint } from "./${checksheetName}-setting";

// Pages
import Cover from "./pages/Cover";
import Blankpage from "./pages/Blankpage";
${Array.from({ length: totalPages }, (_, i) => `import Page${i + 1} from "./pages/Page${i + 1}";`).join('\n')}

function ${checksheetName.replace(/[^a-zA-Z0-9]/g, '')}() {
    const pages = [
        <Cover />,
        <Blankpage />,
${Array.from({ length: totalPages }, (_, i) => `        <Page${i + 1} />,`).join('\n')}
    ];

    const pageLabels = [
        "Cover",
        "Blank",
${Array.from({ length: totalPages }, (_, i) => `        "Page ${i + 1}",`).join('\n')}
    ];

    return (
        <ChecksheetMaster
            config={{ meta, apiEndpoint }}
            pages={pages}
            pageLabels={pageLabels}
        />
    );
}

export default ${checksheetName.replace(/[^a-zA-Z0-9]/g, '')};
`;

// Note: We strip special chars for the component name to ensure valid JS identifier
fs.writeFileSync(path.join(baseDir, `${checksheetName}.jsx`), mainComponentContent);
console.log(`Created ${checksheetName}.jsx`);


// 4. Create Pages (Cover, Blank, Page1...N)
// Create Cover.jsx
const coverPageComponent = `import React from 'react';
import CoverPage from "@/pages/CoverPage";
import { cover, meta } from "../${checksheetName}-setting";

function Cover() {
    return <CoverPage headerData={{ ...cover, model: meta.model }} />;
}

export default Cover;`;

fs.writeFileSync(path.join(pagesDir, 'Cover.jsx'), coverPageComponent);

// Create Blankpage.jsx
const blankPageComponent = `import React from 'react';
import A4blank from "@/components/PageComponent/A4blank";

function Blankpage() {
    return <A4blank />;
}

export default Blankpage;`;

fs.writeFileSync(path.join(pagesDir, 'Blankpage.jsx'), blankPageComponent);

// Create Page1 to PageN
for (let i = 1; i <= totalPages; i++) {
    const pageContent = `import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../${checksheetName}-setting";

function Page${i}() {
    return (
        <A4Paper content={content} currentPage={${i}}>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Page ${i}</h2>
                {/* Add content components here */}
            </div>
        </A4Paper>
    );
}

export default Page${i};`;

    fs.writeFileSync(path.join(pagesDir, `Page${i}.jsx`), pageContent);
}

console.log(`Successfully created Pages (Cover, Blank, 1-${totalPages})`);

// 5. Add to build-all.cjs
const buildScriptPath = path.join(__dirname, 'build-all.cjs');
if (fs.existsSync(buildScriptPath)) {
    try {
        let buildScriptContent = fs.readFileSync(buildScriptPath, 'utf8');

        // Check if form is already in the list to avoid duplicates
        if (!buildScriptContent.includes(`"${checksheetName}"`)) {
            // Regex to find the forms array and insert the new form
            const formsRegex = /(const forms = \[\s*)([\s\S]*?)(\s*\];)/;
            const match = buildScriptContent.match(formsRegex);

            if (match) {
                let currentForms = match[2];
                // Remove trailing whitespace/newlines from the end
                currentForms = currentForms.replace(/\s+$/, '');

                // Add comma if the last item doesn't have one and isn't empty, and isn't a comment
                // We split by newline to check the last meaningful line
                const lines = currentForms.split('\n');
                let lastLine = lines.length > 0 ? lines[lines.length - 1].trim() : '';

                // If last line is empty and there are more lines, check previous
                if (lastLine === '' && lines.length > 1) {
                    lastLine = lines[lines.length - 2].trim();
                }

                const needsComma = lastLine !== '' && !lastLine.endsWith(',') && !lastLine.startsWith('//');

                if (needsComma) {
                    currentForms += ',';
                }

                const newFormsList = `${currentForms}\n    "${checksheetName}"`;

                const newContent = buildScriptContent.replace(formsRegex, `$1${newFormsList}\n$3`);
                fs.writeFileSync(buildScriptPath, newContent);
                console.log(`Added ${checksheetName} to build-all.cjs`);
            } else {
                console.warn("Could not find 'forms' array in build-all.cjs. Please add manually.");
            }
        } else {
            console.log(`${checksheetName} already exists in build-all.cjs`);
        }
    } catch (err) {
        console.error("Error updating build-all.cjs:", err);
    }
} else {
    console.warn("build-all.cjs not found. Skipping auto-add.");
}

console.log("Done.");
