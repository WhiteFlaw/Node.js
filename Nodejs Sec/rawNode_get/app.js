const http = require('http');
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    console.log(req.method);
    const url = req.url;
    req.query = queryString.parse(url.split('?')[1]);

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(JSON.stringify(req.query));
});

server.listen(3000, () => {   //这里如果跑出来不是页面而是文件资源管理器, 那么考虑是否为端口占用的问题, 另外不要在vscode里把服务端跑到8080, 那是浏览器前端的端口
    console.log('server running at http://127.0.0.1:3000');
})

