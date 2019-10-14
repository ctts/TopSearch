var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const bilibiliURL = require('../websURL/url').bilibiliURL
const URL = require('url')
let urlObj = URL.parse(bilibiliURL)

let hotData;



superagent.get(bilibiliURL)
    .set({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Host': 'www.bilibili.com',
        'Referer': 'https://www.bilibili.com/',
        'User-Agent': 'https://www.baidu.com/s?wd=bilibili%E6%8E%92%E8%A1%8C%E6%A6%9C&rsv_spt=1&rsv_iqid=0xb1a7e2320003dab4&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&rsv_dl=ib&inputT=3487',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': ' cross-site',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
    })
    // .set(urlObj)
    .end((err, res) => {
        if (err) {
            // 如果访问失败
            console.log('抓取失败，', err);
        } else {
            hotData = {
                listData: getTitle(res),
            }
        }
    })


// 获取热搜
function getTitle(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);
    let i = 1;
    $('.rank-item').find('.content').find('.info').each((index, element) => {
        let content = $(element).find('a')
        let url = 'https:' + content.attr('href')
        let title = content.text()
        i = i < 10 ? '0' + i : i;
        let hot = {
            id: i,
            title,
            url,
        }
        i++;
        hotTitle.push(hot);
    })
    return hotTitle;
}

/* GET users listing. */
router.use('/', function (req, res, next) {
    res.send(hotData)
});



module.exports = router;