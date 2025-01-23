import fs from "fs";
import path from "path";

// import { FOLDERS } from "./constants.js";
import { getIconsfolders } from "./utils.js";

const FOLDERS = getIconsfolders();

const __dirname = path.resolve();
const reactIconsDir = path.join(__dirname, "node_modules", "react-icons");

const createIconFile = ({ folder, icons }) => {
    let iconFileContent = `/* eslint-disable max-len */
import { genIcon } from "../lib/generator.js";
`;

    for (const icon of icons) {
        iconFileContent += `export const ${icon.name} = genIcon(${icon.content});
`;
    }

    console.log(`Creating ${folder} folder...`);
    const folderDir = path.join(__dirname, "src", `${folder}`);
    if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
    }

    fs.rmSync(path.join(folderDir, "index.js"), { force: true });
    fs.writeFileSync(path.join(folderDir, "index.js"), iconFileContent, "utf-8");
};

console.log("Creating icons");
for (const folder of FOLDERS) {
    const indexFile = path.join(reactIconsDir, folder, "index.js");
    if (!fs.existsSync(indexFile)) {
        continue;
    }

    const content = fs.readFileSync(indexFile, "utf-8");
    const regex = /module\.exports\.([a-zA-Z0-9_]+)\s*=\s*function\s+\1\s*\(props\)\s*{\s*return\s+GenIcon\((\{[\s\S]*?\})\)/g;

    const icons = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        icons.push({
            name: match[1], // Nombre del icono
            content: match[2].trim(), // Contenido de la función
        });
    }

    createIconFile({ folder, icons });
}
console.log("Icons created");
