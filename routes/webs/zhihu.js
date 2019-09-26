var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const zhihuUrl = require('../websURL/url').zhihuURL

let hotData;



superagent.get(zhihuUrl)
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
    $('.wrap').find('.box').each((index, element) => {
        let content = $(element).find('a')
        let href = 'https://daily.zhihu.com' + content.attr('href');

        i = i < 10 ? '0' + i : i;
        let hot = {
            id: i,
            title: content.text(),
            url: href
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