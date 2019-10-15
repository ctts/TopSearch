var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
var app = express()
var verifyToken = require('./public/javascripts/verifyToken')

// 路由路径
var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var websiteRouter = require('./routes/website')
var acceptImages = require('./routes/getUserImage')

// 连接mongodb
require('./mongoose/config/connect')

// 设置定时任务
require('./handle/cycle-operation')

// 设置bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 设置跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    if (!req.url.match(/login/)) {
      let result = verifyToken(req.headers)
      result.then(() => {
        next()
      }).catch(() => {
        next(createError(401))
      })
    } else {
      next()
    }
  }
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// 路由
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/website', websiteRouter)
app.use('/images', acceptImages)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app