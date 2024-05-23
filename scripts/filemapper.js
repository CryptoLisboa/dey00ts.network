console.log("Hello from filemapper.js!");

const fs = require("fs");
const path = require("path");

const generateFolderMapping = (dir, basePath) => {
    const result = {};
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative(basePath, fullPath).replace(/#/g, "%23");
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            result[item] = generateFolderMapping(fullPath, basePath);
        } else {
            const itemName = path.basename(item, path.extname(item));
            result[itemName] = relativePath;
        }
    });

    return result;
};

const createJSONFile = (data, outputPath) => {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");
};

const directoryPath = path.join(__dirname, "public/non_tracked/y00ts_traits");
const outputPath = path.join(__dirname, "y00ts_traits_mapper.json");

const folderStructure = generateFolderMapping(directoryPath, directoryPath);
createJSONFile(folderStructure, outputPath);
