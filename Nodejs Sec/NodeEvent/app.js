const fs = require("fs");

fs.readFile('README.MD', { flag: "r", encoding: "utf-8" }, (err, data) => {
    if (err) {
        lcEvent.emit("error", err)
    } else {
        lcEvent.emit("helloWorld", data)
    }
})

let lcEvent = {
    event: {
        /* helloWorld:[
            fun1(), 
            fun2(), 
            fun(3)
        ] */
    },
    on: function (eventName, eventFn) { // 向event增加事件和处理函数
        if (this.event[eventName]) {
            this.event[eventName].push(eventFn);
        } else { //首先执行下面这个先搞一个数组, 然后push这个事件需要执行的所有事件处理函数到这个数组中
            this.event[eventName] = [];
            this.event[eventName].push(eventFn);
        }
    },
    emit: function (eventName, eventMsg) { // 调用event里的事件处理函数
        if (this.event[eventName]) {
            this.event[eventName].forEach(itemFn => {
                itemFn(eventMsg);
            })
        }
    }
}

lcEvent.on("helloWorld", function (eventMsg) {
    console.log("查询数据库结果: " + eventMsg);
})

lcEvent.on("helloWorld", function (eventMsg) {
    console.log("统计用户年龄比例...");
})

lcEvent.on("error", function (eventMsg) {
    console.log("Error: " + eventMsg);
})