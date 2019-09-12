var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var weiboRouter = require('./routes/weibo');
var baiduRouter = require('./routes/baidu');
var githubRouter = require('./routes/github');
var haoqixinRouter = require('./routes/haoqixin');

var app = express();

// 设置跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/weibo', weiboRouter);
app.use('/baidu', baiduRouter);
app.use('/github', githubRouter);
app.use('/haoqixin', haoqixinRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// //连接本地数据库
// mongoose.connect('mongodb://@127.0.0.1:27017/bishe',{ useNewUrlParser: true }); 
// var db = mongoose.connection;
// // 连接成功
// db.on('open', function () {
//   console.log('-------------MongoDB Connection Successed----------------');
// });
// // 连接失败
// db.on('error', function () {
//   console.log('MongoDB Connection Error');
// });

module.exports = app;