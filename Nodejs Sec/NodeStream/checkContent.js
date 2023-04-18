const fs = require('fs');

const inputDir = './ii'; // 输入目录， 文件夹名

function check() {
    console.log(`getting file list...`)
    fs.readdir(inputDir, (err, files) => {
        console.log(`checking...`)
       for(let i = 0; i < files.length; i++) {
            const data = JSON.parse(fs.readFileSync(`${inputDir}/${files[i]}`, 'utf8'));
            for(let j = 0; j < data.length; j++) {
                if(data[j].obj_occlu === undefined) {
                    write(`occlusion is not defined: id ${data[j].obj_id} in ${files[i]}`);
                }
                if(data[j].obj_trunk === undefined) {
                    write(`trunation is not defined: id ${data[j].obj_id} in ${files[i]}`);
                }
            }
        }
    });
}

function write(text) {
    fs.appendFile(`./log.txt`, `${text}\n`, (err, data) => {
        if (err) throw err;
    });
}

check();