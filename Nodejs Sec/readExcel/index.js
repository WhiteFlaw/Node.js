
const xlsx = require("node-xlsx");

const path = './四月工资总汇.xls';
const day_total = 30; // 天数/月
const price = 160; // 单价

const list = xlsx.parse(path);
const rawData = list[0].data;

// console.log(rawData);

const data = [];

function formatter() {
    rawData[0].forEach((item, index) => {
        item !== undefined && (data.push({ name: item, '日工': {}, '产量': {} }));
    })
}

function getStable() { // 整理前两名数据
    for (let i = 2; i < day_total + 2; i++) {
        data[0][`day${i - 2 + 1}`] = rawData[i][1] || 0;
        data[1][`day${i - 2 + 1}`] = rawData[i][2] || 0;
    }
}

function getDaily() { // 整理计件数据
    let num = 1;

    for (let i = 0; i < data.length + 6; i = i + 2) {
        for (let j = 2; j < day_total + 2; j++) {
            data[num]['日工'][`day${j - 1}`] = rawData[j][i + 1] || 0;
            data[num]['产量'][`day${j - 1}`] = rawData[j][i + 2] || 0;
        }
        num += 1;
    }
}

function getTotal() {

}

formatter();

getStable();

getDaily();

console.log(data);