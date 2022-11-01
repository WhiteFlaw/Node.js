let fs = require('fs');

//let rs = fs.createReadStream('hello.txt', { flags: "r", encoding: "utf-8" });
let rs = fs.createReadStream('./Rosaria.mp4', { flags: "r" });
let ws = fs.createWriteStream('./Rosaria.mp4', { flags: "w" });

console.log(rs);

rs.on('open', function () {
    console.log("open");
})

rs.on('data', (chunk) => {
    console.log(chunk);
    ws.write(chunk, () => {
        console.log("单批输入完成");
    })
})

rs.on('close', function () {
    console.log("close");
    ws.end();
})