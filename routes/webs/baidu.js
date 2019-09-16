const express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
require('superagent-charset')(superagent)
const baiduURL = require('../websURL/url').baiduURL

let hotData = [];

superagent.get(baiduURL)
    .charset()
    .end((err, res) => {
        if (err) {
            // 如果访问失败
            console.log('抓取失败，', err);
        } else {
            hotData = getTitle(res);
        }
    })

function getTitle(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);

    $('td').find('a.list-title').each((index, element) => {
        let content = $(element);
        let href = content.attr('href');
        let hot = {
            title: content.text(),
            url: href
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

// 监听
router.use('/', function (req, res, next) {
    res.send(hotData)
});



module.exports = router;