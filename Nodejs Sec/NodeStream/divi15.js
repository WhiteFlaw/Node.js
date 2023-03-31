const fs = require('fs');

const inputDir = './img';
const outputDir = './img2';
const divi = 15;

const allFiles = [];

const files_n = [];
const path = [];
const ext = '.jpg';

function createPath() {
    fs.readdir(inputDir, (err, files) => {
        let front = files[0].substring(0, files[0].lastIndexOf('_') + 1);
        for(let i = 0; i < files.length; i++) {
            const startIndex = files[i].lastIndexOf('_') + 1;
            const endIndex = files[i].length - 4;
            allFiles.push(files[i].substring(startIndex, endIndex));
        }
        allFiles.sort((a, b) => {
            return a - b;
        })
        for(let i = 0; i < allFiles.length; i = i + divi + 1) {
            files_n.push(`${front}${allFiles[i]}${ext}`);
            path.push(`${inputDir}/${front}${allFiles[i]}${ext}`);
        }

        start();
    });
}

function start() {
    for (var i = 0; i < path.length; i++) {
        fs.createReadStream(path[i]).pipe(
            fs.createWriteStream(`${outputDir}/${files_n[i]}`)
        );
    }
}

createPath();
