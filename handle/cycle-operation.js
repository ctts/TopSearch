// 定时任务插件
const schedule = require('node-schedule');
// 获取数据方法
const getdata = require('./oprations/getHotData');
// 获取豆瓣数据方法
let getdoubandata = require('./find-data/douban');

// bilibili http头部参数
const bilibiliHeader = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Host': 'www.bilibili.com',
    'Referer': 'https://www.bilibili.com/',
    'User-Agent': 'https://www.baidu.com/s?wd=bilibili%E6%8E%92%E8%A1%8C%E6%A6%9C&rsv_spt=1&rsv_iqid=0xb1a7e2320003dab4&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&rsv_dl=ib&inputT=3487',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': ' cross-site',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
}

let needToLoopWebs = [{
    name: 'weibo',
    refreshTime: '3 */1 * * * *',
}, {
    name: 'baidu',
    refreshTime: '3 2 */2 * * *', //每两小时
}, {
    name: 'bilibili',
    header: bilibiliHeader,
}, {
    name: 'github',
}, {
    name: 'haoqixin',
}, {
    name: 'zhihu',
}]

function scheduleCronstyle() {
    //生成网站对象
    let webs = needToLoopWebs.map(web => {
        return createWeb(web)
    })
    // 遍历数组
    webs.forEach(web => {
        schedule.scheduleJob(web.refreshTime, function () {
            // console.log('scheduleCronstyle:' + new Date());
            getdata(web)
                .then((result) => console.log('插入成功', result))
                .catch(err => console.log(err))
        });
    });

    // 豆瓣因为涉及到分页所以需要单独写方法
    // getdoubandata()
    //     .then((result) => console.log('插入成功', result))
    //     .catch(err => console.log(err))
}
scheduleCronstyle();


// 生成网站对象,默认日更,每天1时2分3秒
function createWeb({
    name,
    header = {},
    refreshTime = '3 2 1 * * *'
}) {
    return {
        name,
        header,
        refreshTime,
    }
}