const fs = require("fs");
let events = require("events");
const { resolve } = require("path");

let ee = new events.EventEmitter();

function lcReadFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}

lcReadFile("README.md").then((data) => {
    ee.emit('success', data);
})

ee.on("error", (msg) => {
    console.log("Error: " + msg);
})

ee.on("success", (msg) => {
    console.log("Successfully readFile:  " + msg);
})