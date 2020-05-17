// 定时任务插件
const schedule = require('node-schedule');
// 创建对应网站
const createallweb = require('./oprations/createAllWeb');
// 获取数据方法
const getdata = require('./oprations/getHotData');
// 获取豆瓣数据方法
let getdoubandata = require('./find-data/douban');
//爬虫总开关
const toggle = true

// bilibili http头部参数
const bilibiliHeader = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Host': 'www.bilibili.com',
    'Referer': 'https://www.bilibili.com/',
    'User-Agent': 'https://www.baidu.com/s?wd=bilibili%E6%8E%92%E8%A1%8C%E6%A6%9C&rsv_spt=1&rsv_iqid=0xb1a7e2320003dab4&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&rsv_dl=ib&inputT=3487',
}
const wuaipojieHeader = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Host': 'www.52pojie.cn',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
}
// const juejinHeader = {
//     'Host': 'web-api.juejin.im',
//     'Origin': 'https://juejin.im',
//     'User-Agent': 'Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0 .3987 .122 Safari / 537.36',
//     'Referer': 'https: //juejin.im/?sort=three_days_hottest',
//     'Sec-Fetch-Mode': 'cors',
//     'X-Agent': 'Juejin/Web',
//     'Cookie': `ab = {};
//     gr_user_id = 3 d51baca - be97 - 4 a8e - be29 - d81f5408e2bc;
//     _ga = GA1 .2 .752375647 .1555650393;
//     SLARDAR_WEB_ID = 3805 d6eb - 500 b - 4 cf5 - 8 ab8 - 24e16 e809371;
//     _gid = GA1 .2 .2013318248 .1583074338;
//     Hm_lvt_93bbd335a208870aa1f296bcd6842e5e = 1583114983, 1583141307, 1583142787, 1583222941;
//     gr_session_id_89669d96c88aefbc = aac27960 - 7 dba - 48 b7 - 8349 - 4491305 b741a;
//     gr_cs1_aac27960 - 7 dba - 48 b7 - 8349 - 4491305 b741a = objectId % 3 A5cc41163518825251500e105;
//     gr_session_id_89669d96c88aefbc_aac27960 - 7 dba - 48 b7 - 8349 - 4491305 b741a = true;
//     auth = ;
//     auth.sig = 25 Jg_aucc6SpX1VH8RlCoh6azLU;
//     _gat = 1;
//     QINGCLOUDELB = 908730662 bd97c21a55d59265be1718d9eb2c663a78c233d245e9356cc89386b | Xl5uo | Xl5uk;
//     Hm_lpvt_93bbd335a208870aa1f296bcd6842e5e = 1583247009`
// }

// 需要循环的网站
let needToLoopWebs = [{
    name: 'weibo',
    refreshTime: '3 */1 * * * *', //每一小时
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
}, {
    name: 'weixin',
}, {
    name: 'baidutieba',
}, {
    name: 'wuaipojie',
    header: wuaipojieHeader,
}, {
    name: 'doubannews'
}, {
    name: 'hupunba'
}, {
    name: 'qidian'
}, {
    name: 'shenmezhidemai'
}, {
    name: 'taptap'
}, {
    name: 'ithome'
}, 
// {
//     name: 'juejin',
//     header: juejinHeader
// }
]

// 生成网站对象,默认日更,每天1时2分3秒
function createWebData({
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

async function scheduleCronstyle() {
    //生成网站对象
    let webs = needToLoopWebs.map(web => {
        return createWebData(web)
    })
    // 遍历数组
    for (let web of webs) {
        // 先立即执行一次抓取，再定时抓取
        await getdata(web)
            .then((result) => console.log(result))
            .catch(err => console.log(err))

        // 定时抓取
        await schedule.scheduleJob(web.refreshTime, function () {
            // console.log('scheduleCronstyle:' + new Date());
            getdata(web)
                .then((result) => console.log(result))
                .catch(err => console.log(err))
        });
    }

    // 豆瓣因为涉及到分页所以需要单独写方法
    await getdoubandata()
        .then((result) => console.log('插入成功', result))
        .catch(err => console.log(err))
}




// 依据url生成网站
createallweb().then(() => {
    // 开始定时任务
    if (toggle) {
        scheduleCronstyle();
    }

    // 测试
    getdata({
            name: 'juejin'
        })
        .then((result) => console.log(result))
        .catch(err => console.log(err))
}).catch(err => console.log(err))