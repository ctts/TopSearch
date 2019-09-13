let mongoose = require('mongoose');

//连接本地数据库
mongoose.connect('mongodb://@127.0.0.1:27017/topsearch', {
  useNewUrlParser: true
});
let db = mongoose.connection;
// 连接成功
db.on('open', function () {
  console.log('-------------MongoDB 连接成功----------------');
});
// 连接失败
db.on('error', function () {
  console.log('-------------MongoDB 连接出错----------------');
});
