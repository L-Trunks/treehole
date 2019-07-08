const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type, Cookie,Host,Origin,Referer,User-Agent, Authorization,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

mysql = require('mysql');
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  //用户名
    password: '',   //密码
    database: 'lyt',
    port: '3306'     //端口号
})

function getList(callback) {
    connection.query('select article from wzsqnd', (err, data, fields) => {
        return callback(err, data, fields)
    })
}
function addArticle(article,callback) {
    connection.query('insert into wzsqnd (article) value (?)',[article], (err, data, fields) => {
        return callback(err, data, fields)
    })
}

app.post('/api/getList', (req, res, next) => {
    getList((err, data, fields) => {
        if (err) {
            res.json({ res: 1, message: '请求失败' })
            next(err);
        } else {
            console.log("log:" + '列表请求成功'+"　　时间:"+new Date())
            res.status(200),
                res.json({ ret: 0, message: '请求处理成功！', data: data })
        }
    })
});

app.post('/api/addArticle', (req, res, next) => {
    let article = req.body.data
    addArticle(article,(err, data, fields) => {
        if (err) {
            res.json({ res: 1, message: '请求失败' })
            next(err);
        } else {
            console.log("log:" + '插入成功')
            res.status(200),
                res.json({ ret: 0, message: '请求处理成功！', data: data })
        }
    })
});

//配置服务端口
const server = app.listen(3001, function () {

    const host = server.address().address;
 
    const port = server.address().port;
 
    console.log('Example app listening at http://%s:%s', host, port);
 })
