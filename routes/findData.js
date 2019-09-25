var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const weiboURL = require('../routes/websURL/url').weiboURL
let listItem = require('../mongoose/models/ListItem')
let web = require('../mongoose/models/Web')
let setData = require('../mongoose/operations/updateWebData')
const doubanURL = require('../routes/websURL/url').doubanURL
const puppeteer = require('puppeteer');


// 获取热搜
function getData(res, webId) {
    let data = [];
    let $ = cheerio.load(res.text);
    let infoNumber = 1;
    $('tbody').find('tr').each((index, element) => {
        let content = $(element).find('.td-02').children('a');
        let infoContent = content.text();
        let infoURL = content.attr('href');
        if (infoURL == 'javascript:void(0);') {
            return;
        }
        infoURL = 'https://s.weibo.com/' + infoURL;
        // i = i < 10 ? '0' + i : i;
        let hot = {
            webId,
            infoNumber,
            infoContent,
            infoURL
        }
        infoNumber++;
        data.push(hot);
    })
    return data;
}
/* GET users listing. */
router.use('/', function (req, res, next) {
    setData('weibo', weiboURL)
        .then((val) => {
            res.send(val)
        }).catch((err) => {
            console.log(err)
        })
});



module.exports = router;