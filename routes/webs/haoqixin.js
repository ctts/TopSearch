var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const haoqixinURL = require('../websURL/url').haoqixinURL
let hotData;

superagent.get(haoqixinURL)
    .end((err, res) => {
        if (err) {
            // 如果访问失败
            console.log('抓取失败，', err);
        } else {
            hotData = {
                listData: getTitle(res)
            }
        }
    })

//获取图片路径和name
// function getNameAndImg() {
//   return {
//     name: '微博热搜榜'
//     // img:''
//   };
// }

// 获取热搜
function getTitle(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);
    let i = 1;
    $('.packery-item').each((index, element) => {
        let url = 'http://www.qdaily.com' + $(element).find('a').attr('href');
        let title = $(element).find('a').find('img').attr('alt');
        i = i < 10 ? '0' + i : i;
        let hot = {
            id: i,
            title,
            url
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