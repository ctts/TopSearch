var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
const path = require('path')
var app = express()
var verifyToken = require('./public/javascripts/verifyToken')

// 路由路径
// var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var websiteRouter = require('./routes/website')
var acceptImages = require('./routes/setUserImage')
var historyRouter = require('./routes/history')

// 连接mongodb
require('./mongoose/config/connect')

// 设置定时任务
require('./handle/cycle-operation')

// 设置bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())

// 获取主页
app.use(express.static(path.resolve(__dirname, './public/dist')))

// 将图片开放
app.use('/static/userHead', express.static('public/userHead'))
app.use('/static/webslogo', express.static('public/images'))

// 设置跨域
app.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    if (!(req.url.match(/login/))) {
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

// 路由
// app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/website', websiteRouter)
app.use('/upload', acceptImages)
app.use('/history', historyRouter)

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