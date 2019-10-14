var express = require('express');
var router = express.Router();
var request = require('superagent')
var superagent = require('superagent-charset')(request)
const cheerio = require('cheerio');
const doubanURL = require('../websURL/url').doubanURL
const URL = require('url')
let urlObj = URL.parse(doubanURL)
let hotData;



superagent.get(doubanURL)
    .charset()
    .set(urlObj)
    // .set({
    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    //     // 'Accept-Encoding': 'gzip, deflate, br',
    //     'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    //     'Cache-Control': 'max-age=0',
    //     'Connection': 'keep-alive',
    //     // 'Cookie': 'bid=uXk1oX_EBXY; douban-fav-remind=1; gr_user_id=d1387e61-f633-4977-a26a-ef73c5158290; ll="118226"; viewed="2228378_10549733"; _vwo_uuid_v2=D857EC442159CA0CF2E4D7CA22C5F8619|d1fca0dc920a7e610d328fb674d517d2; ct=y; __utma=30149280.1481674921.1556013412.1569324357.1570965839.15; __utmc=30149280; __utmz=30149280.1570965839.15.12.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utmb=30149280.1.10.1570965839; ap_v=0,6.0; __utma=223695111.1467807948.1567084076.1569324357.1570965849.8; __utmb=223695111.0.10.1570965849; __utmc=223695111; __utmz=223695111.1570965849.8.4.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _pk_ref.100001.4cf6=%5B%22%22%2C%22%22%2C1570965850%2C%22https%3A%2F%2Fwww.google.com.hk%2F%22%5D; _pk_id.100001.4cf6=ec09cd3160b13359.1567084076.6.1570965850.1569324357.; _pk_ses.100001.4cf6=*',
    //     'Host': 'movie.douban.com',
    //     'Referer': 'https://www.google.com.hk/',
    //     'Sec-Fetch-Mode': 'navigate',
    //     'Sec-Fetch-Site': 'cross-site',
    //     'Sec-Fetch-User': '?1',
    //     'Upgrade-Insecure-Requests': '1',
    //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
    // })
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
function getTitle(html) {
    let hotTitle = [];
    console.log(html)
    let $ = cheerio.load(html.text);
    $('.item').find('.info').find('.hd').each((index, element) => {
        let content = $(element).find('a')
        let infoURL = 'https:' + content.attr('href')
        let infoContent = content.find('.title').first().text()
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

/* GET users listing. */
router.use('/', function (req, res, next) {
    res.send(hotData)
});



module.exports = router;