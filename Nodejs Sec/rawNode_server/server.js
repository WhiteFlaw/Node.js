const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url;
    const method = req.method;
    let content = "<h1>404 not found.</h1>"

    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>';
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>';
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(content);
})

server.listen(80, () => {   //这里如果跑出来不是页面而是文件资源管理器, 那么考虑是否为端口占用的问题, 另外不要在vscode里把服务端跑到8080, 那是浏览器前端的端口
    console.log('server running at http://127.0.0.1:80');
})