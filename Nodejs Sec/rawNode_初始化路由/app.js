const serverHandle = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const resData = {
        name: "双月100",
        site: 'imooc',
        env: process.env.NODE_ENV
    }

    res.end(JSON.stringify(resData));
}

module.exports = serverHandle