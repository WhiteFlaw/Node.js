let path = require('path');
//console.log(path);

let strPath = "http://www.xinhuanet.com//2019-11/23/c_1125266028.htm";
// 获取路径后缀名
let inf1 = path.extname(strPath);
//console.log(info1);

//将一个路径或一个路径片段序列解析为绝对路径, 路径拼合
let arr2 = ['/qianduan', 'zhongji', 'stst'];
let info2 = path.resolve(...arr2);
//console.log(info2);

//__dirname是当前执行目录的完整路径, join也是路径拼接 
let info3 = path.join(...[__dirname, "/sttrtrr"])
console.log(info3);

let str = "http://www.sxt.com/xinwen/guonei.html";
// 解析地址
let arrParse = str.split('/');
console.log(arrParse);
let arr3 = arrParse.slice(arrParse.length - 3, arrParse.length - 1);
console.log(arr3);

//__filename 当前执行的文件
console.log("解析当前执行文件的路径信息: " + path.parse(__filename));