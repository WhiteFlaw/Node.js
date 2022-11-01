let fs = require('fs');

fs.writeFile("./test.txt", "嘉然今天吃什么", { flag: "w", encoding: "utf-8" }, function (err) {  //flag可以规定写入模式, 追加写入或者覆写等等
    if (err) {
        console.log("写入内容出错.");
    } else {
        console.log("写入内容成功.");
    }
})

function writeFs(path, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, { flag: "a", encoding: "utf-8" }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}

let buf1 = Buffer.alloc(10);  //安全, 开辟内存后会顺带清空这部分内存中的内容, 但是性能差一些
console.log(buf1);
//<Buffer 0a 00 00 00 00 00 00 00 00 00>
/* 内存里开辟一个空缓冲区buffer, buffer主要用于解决js数组的元素在内存中不相邻存储导致的低效率问题
相比于其他后端语言, js数组没有固定大小, 内存里存储的位置也不规则,
buffer直接在内存中开辟一块固定大小的内存, 直接用buffer替代数组以提高效能 */


let buf2 = Buffer.allocUnsafe(10);  //性能高但是不安全, 开辟空间后不会主动清空这部分空间的内存内容, 全靠覆盖
buf1[0] = 10;
console.log(buf1);