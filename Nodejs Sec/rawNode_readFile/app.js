var fs = require('fs');

var content = fs.readFileSync("./package-lock.json", { flag: "r", encoding: "utf-8" });

console.log(content);

var w1 = fsRead('hello.txt');
w1.then(function (res) {
    console.log(res);
})

async function ReadList() {
    var file2 = await fsRead('hello.txt');
    console.log(file2);
    var file2 = file2 + ".txt";
    var file3 = await fsRead(file2);
    console.log(file3);

}