//express提供的express.static()函数, 可以非常便捷的生成一个静态资源服务器.
//对外开放本地静态资源
const express = require('express');

const app = express();

app.use(express.static('./public'));  //http://127.0.0.1:3000/css/index.css
//app.use('/public', express.static('./public'));    //http://127.0.0.1:3000/public/css/index.css
//express在指定的静态资源目录查找文件并对外提供资源的访问路径, 
//因此存放静态文件的目录名(即public)不会出现在url中

app.listen(3000, () => {
    console.log("express server running at http://127.0.0.1:3000")
})

//项目404的时候可以重跑一下, 还不行就npm init, 前提不是报错