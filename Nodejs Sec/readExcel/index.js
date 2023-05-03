let fs = require('fs');
const xlsx = require("node-xlsx");

const input = './数据/四月工资总汇.xls';
const output = './结果/四月工资总汇.xls';

const price = 160; // 单价
const day_total = 30; // 天数/月

const list = xlsx.parse(input);
const rawData = list[0].data;

const data = [];

function formatter() {
    rawData[0].forEach((item, index) => {
        if (item !== undefined) {
            if (data.length < 2) {
                data.push({ name: item, '日工': [] });
            } else {
                data.push({ name: item, '日工': [], '产量': [] });
            }
        }
    })
    console.log('formatted.')
}

function getStable() { // 整理前两名数据
    for (let i = 2; i < day_total + 2; i++) {
        data[0]['日工'].push(rawData[i][1] || 0);
        data[1][`日工`].push(rawData[i][2] || 0);
    }
}

function getDaily() { // 整理计件数据
    let num = 1;

    for (let i = 0; i < data.length + 6; i = i + 2) {
        for (let j = 2; j < day_total + 2; j++) {
            if (num > 1) {
                data[num]['日工'].push(rawData[j][i + 1] || 0);
                data[num]['产量'].push(rawData[j][i + 2] || 0);
            }
        }
        num += 1;
    }
    console.log('restructure finished.')
}

function getTotalYield() { // 总产量
    console.log('computed.')
    for (let i = 0; i < 3; i++) {
        data[i]['总工资'] = data[i]['日工'].reduce((prev, curr) => {
            if (isNaN(Number(curr))) {
                return prev + 0;
            } else {
                return prev + Number(curr);
            }
        },)
    }

    for (let i = 2; i < data.length; i++) {
        data[i]['总产量'] = data[i]['产量'].reduce((prev, curr) => {
            if (isNaN(Number(curr))) {
                return prev + 0;
            } else {
                return prev + Number(curr);
            }
        }, 0)
        data[i]['总产值'] = data[i]['总产量'] * price;
    }
}


function write() {
    console.log('writing...')
    let excelData = [
        ['', data[0].name, data[1].name],
        ['', '', '']
    ];

    for (let i = 2; i < data.length; i++) { // 表头
        excelData[0].push(data[i].name);
        excelData[0].push('');
        if (i < data.length - 1) {
            excelData[1].push('日工');
            excelData[1].push('产量');
        }
    }

    for (let i = 0; i < day_total; i++) { // 表体
        excelData.push([i + 1, data[0]['日工'][i], data[1]['日工'][i]]);
        for (let j = 0; j < data.length - 2; j++) {
            excelData[2 + i].push(data[2 + j]['日工'][i]);
            excelData[2 + i].push(data[2 + j]['产量'][i]);
        }
    }

    console.log(data)

    const temArr0 = ['总日工/总产量', data[0]['总工资'], data[1]['总工资']];
    const temArr1 = ['总产值', '', ''];

    for (let i = 2; i < data.length; i++) {
        temArr0.push(data[i]['总日工'], data[i]['总产量']);
        temArr1.push('', data[i]['总产值']);
    }

    excelData.push([], temArr0, temArr1);

    const excelArr = [{
        name: `sheet1`,
        data: excelData
    }];

    // xlsx转化成二进制
    let buffer = xlsx.build(excelArr);
    fs.writeFile(output, buffer, function (err) {
        if (err)
            throw err;
        console.log('done.');
    });
}

formatter();

getStable();

getDaily();

getTotalYield();

write();
