import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const getDirectories = (source) => {
    const files = fs.readdirSync(source, { withFileTypes: true });
    return files.filter((dirent) => dirent.isDirectory() && dirent.name !== "lib").map((dirent) => dirent.name);
};

export const getIconsfolders = () => {
    const reactIcons = path.join(__dirname, "node_modules", "react-icons");

    return getDirectories(reactIcons);
};

export const getIcons = async (folder) => {
    const data = await import(`../${folder}/index.js`);

    const keys = Object.keys(data);
    const icons = [];
    keys.forEach((key) => {
        icons.push({
            name: key,
            content: data[key],
        });
    });

    return icons;
};
