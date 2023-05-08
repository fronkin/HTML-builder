const fs = require('fs').promises;
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle() {
    try {
        const stylesFileNames = await fs.readdir(stylesDir);

        let bundleContent = '';
        for (const fileName of stylesFileNames) {
            const filePath = path.join(stylesDir, fileName);
            const isDirectory = (await fs.stat(filePath)).isDirectory();

            if (!isDirectory && path.extname(fileName) === '.css') {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                bundleContent += fileContent;
            }
        }

        await fs.writeFile(bundleFile, bundleContent);

    } catch (err) {
        console.error(`Ошибка при создании файла bundle.css: ${err}`);
    }
}

createBundle();