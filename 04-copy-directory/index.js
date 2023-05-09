const fsPromises = require('fs/promises');
const path = require('path');
const filesSourceDir = path.join(__dirname, 'files');
const filesTargetDir = path.join(__dirname, 'files-copy');

async function fileCopyDir() {
    try {
        await fsPromises.mkdir(filesTargetDir, { recursive: true });
        const files = await fsPromises.readdir(filesSourceDir);
        const targetFiles = await fsPromises.readdir(filesTargetDir);
        for (let file of targetFiles) {
            if (!files.includes(file)) {
                const targetFile = path.join(filesTargetDir, file);
                await fsPromises.unlink(targetFile);
            }
        }
        for (let file of files) {
            const sourceFile = path.join(filesSourceDir, file);
            const targetFile = path.join(filesTargetDir, file);
            await fsPromises.copyFile(sourceFile, targetFile);
        }
        fsPromises.watch(filesSourceDir, { persistent: false }, async (eventType, filename) => {
            if (eventType === 'change') {
                const sourceFile = path.join(filesSourceDir, filename);
                const targetFile = path.join(filesTargetDir, filename);
                await fsPromises.copyFile(sourceFile, targetFile);
            }
        });
    } catch (error) {
        console.error(error);
    }
}
fileCopyDir();