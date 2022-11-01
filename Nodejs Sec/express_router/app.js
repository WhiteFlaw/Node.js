//不使用express, 直接用原生node的http模块服务器也可以, 但是未经封装使用复杂, 开发效率低
//express的服务器基于node进行过封装, 可以极大提升开发效率

const express = require('express');

const app = express();



app.get("/user", function (req, res) {
    res.send({ name: "baiX", age: 20, gender: '男' });
    console.log(req.query);
});

app.post("/home", function (req, res) {
    res.send({ name: "baiX", age: 20, gender: '男' });
})

app.get('/', function (req, res) {
    console.log(req.query);
    res.send(req.query);  //通过query对象访问客户端通过客户端查询字符串形式发送到服务器的参数
})

app.get('/user/:id', function (req, res) {   //http://127.0.0.1/user/1
    console.log(req.params);
    res.send(req.params);
})  //通过req.params对象访问url中匹配到的动态参数, req.params默认为空对象

app.listen(80, () => {
    console.log("express server running at http://localhost:80")
})