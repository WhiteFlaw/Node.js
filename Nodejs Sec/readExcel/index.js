
const xlsx = require("node-xlsx");

const path = './四月工资总汇.xls';
const day_total = 30; // 天数/月
const price = 160; // 单价

const list = xlsx.parse(path);
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
}

function getTotalYield() { // 总产量
    for (let i = 2; i < data.length; i++) {
        data[i]['总产量'] = data[i]['产量'].reduce((prev, curr) => {
            if (isNaN(Number(curr))) {
                return prev + 0;
            } else {
                return prev + curr;
            }
        }, 0)
    }
}

function getSalary() { // 总日工
    for (let i = 0; i < data.length; i++) {
        data[i]['总日工'] = data[i]['日工'].reduce((prev, curr) => {
            if (isNaN(Number(curr))) {
                return prev + 0;
            } else {
                return prev + curr;
            }
        }, 0)
    }
}

function somethingElse() {
    for(let i = 2; i < data.length; i++) {
        data[i]['总产值'] = data[i]['总产量'] * price;
        data[i]['工资'] = data[i]['总日工'] + data[i]['总产值'];
    }
}

formatter();

getStable();

getDaily();

getTotalYield();

getSalary();

somethingElse();

console.log(data);