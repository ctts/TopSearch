let schedule = require('node-schedule');
let getdata = require('./find-data/weibo')

function scheduleCronstyle() {
    schedule.scheduleJob('0 * * * * *', function () {
        console.log('scheduleCronstyle:' + new Date());
        getdata()
    });
}

scheduleCronstyle();