import fs from "fs";
import * as ai from "./src/ai/index.js";
import * as bi from "./src/bi/index.js";
import * as bs from "./src/bs/index.js";
import * as di from "./src/di/index.js";
import * as fa from "./src/fa/index.js";
import * as fc from "./src/fc/index.js";
import * as gi from "./src/gi/index.js";
import * as hi from "./src/hi/index.js";
import * as io from "./src/io/index.js";
import * as lia from "./src/lia/index.js";
import * as md from "./src/md/index.js";
import * as pi from "./src/pi/index.js";
import * as tb from "./src/tb/index.js";
import * as wi from "./src/wi/index.js";

const objects = [ai, bi, bs, di, fa, fc, gi, hi, io, lia, md, pi, tb, wi];
const folders = ["ai", "bi", "bs", "di", "fa", "fc", "gi", "hi", "io", "lia", "md", "pi", "tb", "wi"];

// Create folders
if (fs.existsSync("./gen")) {
    fs.rmSync("./gen", { recursive: true });
}
fs.mkdirSync("./gen");

// Generate icons
// const importsJs = [];
// const importsDts = [];
objects.forEach((object, i) => {
    const folder = folders[i];
    fs.mkdirSync(`./gen/${folder}`);
    Object.keys(object).forEach((key) => {
        const iconString = object[key];
        // fs.writeFileSync(`./gen/${folder}/${key}.svg`, iconString, "utf-8");
        fs.writeFileSync(`./gen/${folder}/${key}.js`, "export const " + key + " = `" + iconString + "`", "utf-8");
        fs.writeFileSync(`./gen/${folder}/${key}.d.ts`, "export const " + key + ": string;", "utf-8");
        // importsJs.push(`export { ${key} } from "./${folder}/${key}.js";`);
        // importsDts.push(`export { ${key} } from "./${folder}/${key}";`);
    });
});

// fs.writeFileSync("./gen/index.js", importsJs.join("\n"), "utf-8");
// fs.writeFileSync("./gen/index.d.ts", importsDts.join("\n"), "utf-8");

// Copy base files
const files = [".npmignore", "LICENSE.md", "package.json", "README.md"];
files.forEach((file) => {
    fs.copyFileSync(`./${file}`, `./gen/${file}`);
});
