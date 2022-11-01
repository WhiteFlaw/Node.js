const fs = require('fs');

fs.readFile("./score.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        let res = data.toString();
        //console.log(res);

        let res2 = res.substring(0, 64);
        let res3 = res.substring(61, res.length);//.split(",");
        let res4 = res3.split(", ");
        let newArr = [];
        for (var i = 0; i < res4.length; i++) {
            newArr.push(res4[i] + "\n");
        }
        let list = newArr.toString();
        //console.log(newArr.toString());
        fs.writeFile("./list.txt", list, function (err) {
            if (err) {
                console.log("写入错误:" + err);
            } else {
                console.log("写入完成.");
            }
        });
    }
})