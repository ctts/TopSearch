const schedule = require('node-schedule');
const getdata = require('./oprations/getHotData')

// function scheduleCronstyle() {
//     schedule.scheduleJob('0 * * * * *', function () {
//         console.log('scheduleCronstyle:' + new Date());
//         getdata()
//     });
// }

// scheduleCronstyle();

getdata('weibo')
    .then(() => console.log('插入成功'))
    .catch(err => console.log(err))

getdata('baidu')
    .then(() => console.log('插入成功'))
    .catch(err => console.log(err))