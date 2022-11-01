// 提供从输入到输出的机制, 适用于从一个流读取, 另一个流写入

var fs = require("fs");

var readStream1 = fs.createReadStream("【神秘巨星CI】Opiumud社-尼尔机械纪元 ヨルハ部隊粛清計画 汉化版 .mp4");
var readStream2 = fs.createReadStream("【Genshin Impact】Sick Like That-4K.mp4");

var writeStream1 = fs.createWriteStream("../test/test1.txt");
var writeStream2 = fs.createWriteStream("../test/test2.txt");

readStream1.on('close', () => {
    console.log("done1")
})

readStream2.on('close', () => {
    console.log("done2")
})

readStream1.pipe(writeStream1);
readStream2.pipe(writeStream2);

