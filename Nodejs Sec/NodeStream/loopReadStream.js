var fs = require("fs");
var path = require("path");

var inputDir = "C:/Users/hp/Desktop/431960" // 输入目录
var outputDir = "C:/Users/hp/Desktop/431967" // 输出目录
var allPath = []

let res = fs.readdirSync(inputDir)
console.log("Find " + res.length + " events in the workshop.")

function start() {
    console.log("Start!");
    for (var i = 0; i <= res.length - 1; i++) {
        console.log("Getting path...")
        let temArr = fs.readdirSync(inputDir + '/' + res[i])
        console.log("Getting videos...")
        temArr.find((item) => {
            if (path.extname(item) === '.mp4') {
                allPath.push(`${inputDir}/${res[i]}/${item}`);
                console.log(`Got ${item}`)
            }
        })
    }
    console.log("Start reading...")
    for (var i = 0; i <= allPath.length - 1; i++) {
        fs.createReadStream(allPath[i]).pipe(
            fs.createWriteStream(`${outputDir}/video${i}.mp4`)
        );
    }
    console.log("done.")
}
start()

