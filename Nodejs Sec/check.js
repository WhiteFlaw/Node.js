const fs = require('fs');

const inputDir = './烟台'; // 输入目录， 文件夹名
let scale_z_min = null;
let scale_z_max = null;
let scale_x_min = null;
let scale_x_max = null;
let scale_y_min = null;
let scale_y_max = null;

let position_x_min = -10.0;
let position_x_max = 200.0;
let position_y_min = -70.0;
let position_y_max = 70.0;
let position_z_min = -4.0;
let position_z_max = 8.0;

function check() {
    console.log(`get paks...`)
    const paks = fs.readdirSync(inputDir);

    for (let h = 0; h < paks.length; h++) {
        const files = fs.readdirSync(`${inputDir}/${paks[h]}/label`);

        for (let i = 0; i < files.length; i++) {
            const data = JSON.parse(fs.readFileSync(`${inputDir}/${paks[h]}/label/${files[i]}`, 'utf8'));
            console.log(`reading ${inputDir}/${paks[h]}/label/${files[i]}`);

            for (let j = 0; j < data.length; j++) { // xyz
                console.log('change the standard...')
                switch (data[j].obj_type) {
                    case 'Car':
                        scale_x_min = 2.2; // length
                        scale_x_max = 6.6;
                        scale_y_min = 1.4; // width
                        scale_y_max = 2.5;
                        scale_z_min = 1.1; // height
                        scale_z_max = 2.5;
                        break;
                    case 'Truck':
                        scale_x_min = 3.0; // length
                        scale_x_max = 20.0;
                        scale_y_min = 1.5; // width
                        scale_y_max = 3.0;
                        scale_z_min = 1.5; // height
                        scale_z_max = 6.0;
                        break;
                    case 'Pedestrain':
                        scale_x_min = 0.2; // length
                        scale_x_max = 1.5;
                        scale_y_min = 0.2; // width
                        scale_y_max = 1.5;
                        scale_z_min = 0.5; // height
                        scale_z_max = 2.0;
                        break;
                    case 'Cyclist':
                        scale_x_min = 1.0; // length
                        scale_x_max = 2.5;
                        scale_y_min = 0.3; // width
                        scale_y_max = 1.5;
                        scale_z_min = 1.0; // height
                        scale_z_max = 2.5;
                        break;
                    case 'Bus':
                        scale_x_min = 5.0; // length
                        scale_x_max = 18.0;
                        scale_y_min = 2.0; // width
                        scale_y_max = 3.5;
                        scale_z_min = 2.0; // height
                        scale_z_max = 5.0;
                        break;
                    default:
                        continue;
                }
                console.log(`check position...`);
                if (data[j].psr.position.z < position_z_min || data[j].psr.position.z > position_z_max) {
                    write(`${paks[h]}/label/${files[i]} | "obj_id": ${data[j].obj_id} | z_position : ${position_z_min} : ${position_z_max} : ${data[j].psr.position.z}`);
                }
                if (data[j].psr.position.x < position_x_min || data[j].psr.position.x > position_x_max) {
                    write(`${paks[h]}/label/${files[i]} | "obj_id": ${data[j].obj_id} | x_position : ${position_x_min} : ${position_x_max} : ${data[j].psr.position.x}`);
                }
                if (data[j].psr.position.y < position_y_min || data[j].psr.position.y > position_y_max) {
                    write(`${paks[h]}/label/${files[i]} | "obj_id": ${data[j].obj_id} | y_position : ${position_y_min} : ${position_y_max} : ${data[j].psr.position.y}`);
                }
                console.log('check scale...');
                if (data[j].psr.scale.z < scale_z_min || data[j].psr.scale.z > scale_z_max) {
                    write(`${paks[h]}/label/${files[i]} | "obj_id": ${data[j].obj_id} | z_height : ${scale_z_min} : ${scale_z_max} : ${data[j].psr.scale.z}`);
                }
                if (data[j].psr.scale.x < scale_x_min || data[j].psr.scale.x > scale_x_max) {
                    write(`${paks[h]}/label/${files[i]} | "obj_id": ${data[j].obj_id} | x_length : ${scale_x_min} : ${scale_x_max} : ${data[j].psr.scale.x}`);
                }
                if (data[j].psr.scale.y < scale_y_min || data[j].psr.scale.y > scale_y_max) {
                    write(`${paks[h]}/label/${files[i]} | "obj_id": ${data[j].obj_id} | y_width : ${scale_y_min} : ${scale_y_max} : ${data[j].psr.scale.y}`);
                }
            }
        }
    }
}

function write(text) {
    try {
        fs.appendFileSync(`./log.txt`, `${text}\n`);
    } catch (err) {
        console.warn(err);
    }
}

check();