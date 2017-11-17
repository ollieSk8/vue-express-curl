/**
 * Created by ollie on 2017/11/17.
 */
const express = require('express');
const consolidate = require('consolidate');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config').config;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.set('views', './views');
app.engine('html', consolidate.ejs);

//链接数据库
var db = mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database,
});
//增加操作
app.use('/add', (req, res)=> {
    var username = req.body.username;
    var password = req.body.password;
    var add_sql = `insert into user_table values (0,'${username}','${password}')`;
    db.query(add_sql, (err, data, fields)=> {
        if (err) {
            console.log(err);
            res.send({
                code: 40000,
                msg: '服务器端错误，请联系管理员'
            })
        }
        res.send({
            code: 0,
            msg: 'ok'
        });
    });
});

//删除操作
app.use('/delete', (req, res)=> {
    var id = req.body.id;
    var delete_sql = `delete from user_table where ID=${id}`;
    db.query(delete_sql, (err, data, fields)=> {
        if (err) {
            console.log(err);
            res.send({
                code: 40000,
                msg: '服务器端错误，请联系管理员'
            })
        }
        res.send({
            code: 0,
            msg: 'ok'
        });
    });
});

//查询单个
app.use('/fetch_one', (req, res)=> {
    var id = req.query.id;
    var fetch_one_sql = `SELECT * FROM user_table where ID=${id}`;
    db.query(fetch_one_sql, (err, data, fields)=> {
        if (err) {
            console.log(err);
            res.send({
                code: 40000,
                msg: '服务器端错误，请联系管理员'
            })
        }
        res.send({
            code: 0,
            data: {
                username: data[0].username,
                password: data[0].password
            }
        });
    });
});

//编辑单个
app.use('/edit_one', (req, res)=> {
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var edit_one_sql = `update user_table set username='${username}',password='${password}' where ID=${id}`;
    db.query(edit_one_sql, (err, data, fields)=> {
        if (err) {
            console.log(err);
            res.send({
                code: 40000,
                msg: '服务器端错误，请联系管理员'
            })
        }
        res.send({
            code: 0,
            msg: 'ok'
        });
    });
});

// fetch_list
app.use('/fetch_list', (req, res)=> {
    db.query('SELECT * FROM user_table', (err, data, fields)=> {
        if (err) {
            console.log('err');
            res.send({
                code: 40000,
                msg: '服务器端错误，请联系管理员'
            })
        }
        res.send({
            code:0,
            data:data
        });
    });

});
app.use('/', (req, res)=> {
    res.render('index.ejs');
});
app.listen(config.port);
