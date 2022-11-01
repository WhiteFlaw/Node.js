let fs = require("fs");

let { fsWrite, fsRead } = require("./");

fs.readdir('../', function (err, file) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
})