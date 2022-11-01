let fs = require("fs");

// 创建写入流, 获取流对象, 监听流对象
//创建写入流(写入目标, 写入配置)
let ws = fs.createWriteStream("hello.txt", { flags: "w", });
console.log(ws);

ws.on('open', () => {
    console.log('open');
})

ws.on('ready', () => {
    console.log('ready');
})

ws.on('close', () => {
    console.log('close');
})

// 文件流式写入
ws.write("helloWorld", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("done");
    }
})

ws.end(() => {
    console.log("write done")
})