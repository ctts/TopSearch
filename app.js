var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
// var weiboRouter = require('./routes/webs/weibo');
// var baiduRouter = require('./routes/webs/baidu');
// var githubRouter = require('./routes/webs/github');
// var haoqixinRouter = require('./routes/webs/haoqixin');
// var zhihuRouter = require('./routes/webs/zhihu');
// var bilibiliRouter = require('./routes/webs/bilibili')
// var doubanRouter = require('./routes/webs/douban');
// var findDataRouter = require('./routes/findData')

var loginRouter = require('./routes/login');

// 设置定时任务
require('./handle/cycle-operation');

// 连接mongodb
require('./mongoose/config/connect');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 设置跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
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
// app.use('/weibo', weiboRouter);
// app.use('/baidu', baiduRouter);
// app.use('/github', githubRouter);
// app.use('/haoqixin', haoqixinRouter);
// app.use('/login', loginRouter);
// app.use('/zhihu', zhihuRouter);
// app.use('/bilibili', bilibiliRouter);

// app.use('/douban', doubanRouter);
// app.use('/findData', findDataRouter);

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

module.exports = app;