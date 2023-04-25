const fs = require('fs');

const inputDir = ''; // 输入目录
const outputDir = ''; // 输出目录

function getData() {
    fs.readdir(inputDir, (err, dirs) => {
        for (let i = 0; i < dirs.length; i++) {
            fs.mkdir(`${outputDir}/${dirs[i]}/label`, { recursive: true }, (erro) => {
                fs.readdir(`${inputDir}/${dirs[i]}/label`, (error, files) => {
                    for (let j = 0; j < files.length; j++) {
                        const data = JSON.parse(fs.readFileSync(`${inputDir}/${dirs[i]}/label/${files[j]}`, 'utf8'));
                        const res = complex(data);
                        write(`${outputDir}/${dirs[i]}/label/${files[j]}`, res);
                    }
                })
            })
        }
    });
}

function complex(data) {
    const temArr = [];
    for (let i = 0; i < data.length; i++) {
        const temObj = {}
        temObj['class'] = data[i].obj_type;
        temObj['obj_id'] = data[i].obj_id;
        temObj['x'] = data[i].psr.position.x;
        temObj['y'] = data[i].psr.position.y;
        temObj['z'] = data[i].psr.position.z;
        temObj['l'] = data[i].psr.scale.x;
        temObj['w'] = data[i].psr.scale.z;
        temObj['h'] = data[i].psr.scale.y;
        temObj['alpha'] = data[i].psr.rotation.x;
        temObj['truncated'] = exist(data[i].obj_trunk);
        temObj['occluded'] = exist(data[i].obj_occl);
        temObj['motion'] = exist(data[i].motion);
        temArr.push(temObj);
    }
    return JSON.stringify(temArr);
}

function exist(val) {
    return val === undefined ? '' : val;
}

function write(path, text) {
    fs.writeFile(path, text, (err, data) => {
        if (err) throw err;
    });
}

getData();