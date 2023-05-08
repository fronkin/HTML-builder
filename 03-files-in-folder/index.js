const fs = require('fs');
const path = require('path');








const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        fs.stat(path.join(secretPath, file), (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }

            if (!stats.isFile()) return;

            const filesSize = stats.size / 1024;
            const filesExt = path.extname(file);
            const filesName = path.basename(file, filesExt);

            console.log(`${filesName} - ${filesExt} - ${filesSize.toFixed(3)}kb`);
        });
    });
});