import fs from "fs";

import { FOLDERS, ICONS } from "./src/lib/constants.js";

console.log("Removing old dist folder...");
// Create folders
if (fs.existsSync("./dist")) {
    fs.rmSync("./dist", { recursive: true });
}
fs.mkdirSync("./dist");

console.log("Old dist folder removed");
console.log("Building icons");

// Generate icons
ICONS.forEach((object, i) => {
    const folder = FOLDERS[i];
    fs.mkdirSync(`./dist/${folder}`);
    Object.keys(object).forEach((key) => {
        const iconString = object[key];
        fs.writeFileSync(`./dist/${folder}/${key}.js`, "export const " + key + " = `" + iconString + "`", "utf-8");
        fs.writeFileSync(`./dist/${folder}/${key}.d.ts`, "export const " + key + ": string;", "utf-8");
    });
});

// Copy base files
const files = [".npmignore", "LICENSE.md", "package.json", "README.md"];
files.forEach((file) => {
    fs.copyFileSync(`./${file}`, `./dist/${file}`);
});

console.log("Icons built");
