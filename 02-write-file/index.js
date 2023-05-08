const fs = require('fs');
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let string = '';

function enterYouString() {
    rl.question('Введите текст: ', (answer) => {
        if (answer === 'exit') {
            exit();
        } else {
            string += answer + '\n';
            writeFile(string);
            enterYouString();
        }
    });
}
function writeFile(string) {
    fs.appendFile(path.join(__dirname, 'string.txt'), string, (err) => {
        if (err) {
            throw err;
        }
    });
}



function exit() {
    console.log('\nДо свидания!');
    process.exit();
}

fs.writeFile(path.join(__dirname, 'string.txt'), string, (err) => {
    if (err) {
        throw err;
    }
    enterYouString();
});

rl.on('close', exit);