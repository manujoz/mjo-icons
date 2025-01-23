import fs from "fs";

import { getIcons, getIconsfolders } from "./src/lib/utils.js";

const FOLDERS = getIconsfolders();

console.log("Removing old dist folder...");
// Create folders
if (fs.existsSync("./dist")) {
    fs.rmSync("./dist", { recursive: true });
}
fs.mkdirSync("./dist");

console.log("Old dist folder removed");
console.log("Building icons");

// Generate icons
let totalIcons = 0;
let packageExports = { ".": "./index.js" };
let indexExports = "";

for (const folder of FOLDERS) {
    const icons = await getIcons(folder);
    if (icons.length === 0) continue;

    packageExports[`./${folder}`] = `./${folder}/index.js`;
    indexExports += `export * from "./${folder}/index";\n`;

    fs.mkdirSync(`./dist/${folder}`);

    let content = "";
    let types = "";
    icons.forEach((icon) => {
        totalIcons++;
        content += `export const ${icon.name} = \`${icon.content}\`;\n`;
        types += `export const ${icon.name}: string;\n`;
    });

    fs.writeFileSync(`./dist/${folder}/index.js`, content, "utf-8");
    fs.writeFileSync(`./dist/${folder}/index.d.ts`, types, "utf-8");
}

// Create index.js and index.d.ts
fs.writeFileSync("./dist/index.js", indexExports, "utf-8");
fs.writeFileSync("./dist/index.d.ts", indexExports, "utf-8");

// Create package.json
const packageJson = JSON.parse(fs.readFileSync("./package.json"));
delete packageJson["scripts"];
delete packageJson["devDependencies"];

packageJson["exports"] = packageExports;

fs.writeFileSync("./dist/package.json", JSON.stringify(packageJson, null, 2), "utf-8");

// Copy base files
const files = [".npmignore", "LICENSE.md", "README.md"];
files.forEach((file) => {
    fs.copyFileSync(`./${file}`, `./dist/${file}`);
});

console.log("Icons built. Total icons: ", totalIcons);
