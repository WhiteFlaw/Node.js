const fs = require('fs');

const inputDir = 'D:/BaiduNetdiskDownload/20230421/lidardata';  // 输入目录
const outputDir = 'C:/Users/86178/Desktop/lidardata';  // 输出目录
const divi = 15;  // 隔几个

const allFiles = [];

const path = [];
const files_n = [];
const ext = '.bin';

function createPath() {
    const files = fs.readdirSync(inputDir);
    let front = files[0].substring(0, files[0].lastIndexOf('_') + 1);
    for (let i = 0; i < files.length; i++) {
        const startIndex = files[i].lastIndexOf('_') + 1;
        const endIndex = files[i].length - 4;
        allFiles.push(files[i].substring(startIndex, endIndex));
    }

    allFiles.sort((a, b) => {
        return a - b;
    })

    for (let i = 0; i < allFiles.length; i = i + divi + 1) {
        files_n.push(`${front}${allFiles[i]}${ext}`);
        path.push(`${inputDir}/${front}${allFiles[i]}${ext}`);
    }
}

function start() {
    for (var i = 0; i < path.length; i++) {
        fs.createReadStream(path[i], { autoClose: true, encoding: 'utf8' }).pipe(
            fs.createWriteStream(`${outputDir}/${files_n[i]}`, { autoClose: true })
        );
    }
}

createPath();
start();