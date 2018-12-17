var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
// 添加mongoose模块链接数据库
var mongoose = require('mongoose')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var routers = require('./routes/index')

var app = express();

// 设置数据库链接地址
mongoose.connect('mongodb://lemon:lemon123@120.79.214.223:27017/lemon');

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 设置密钥
// app.set('jwtTokenSecret', "DesmixAd");
app.secret = 'DesmixAd';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/static', express.static('www'))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});



routers(app);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.post('/uploadnew', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    if (!req.files) {
        res.json({
            msg: 0
        });
    }

    console.log(req.files.foo);
    console.log(req.files);
    let sampleFile = req.files.foo;

    sampleFile.mv('../../www/' + req.files.file.name, function(err) {
        console.log(err)
        if (err) {
            res.json({
                msg: "上传失败"
            });
        }

        res.json({
            msg: 1
        });
    });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// var debug = require('debug')('my-application'); // debug模块
// app.set('port', process.env.PORT || 3000); // 设定监听端口
//
// //启动监听
// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });

module.exports = app;
