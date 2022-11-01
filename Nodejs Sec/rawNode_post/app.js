const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'post') {
        console.log('req content-type: ', req.headers['content-type']);
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            res.end('hello world');
        });
    }
});

server.listen(3000, () => {   //这里如果跑出来不是页面而是文件资源管理器, 那么考虑是否为端口占用的问题, 另外不要在vscode里把服务端跑到8080, 那是浏览器前端的端口
    console.log('server running at http://127.0.0.1:3000');
})

