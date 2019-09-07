var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');

let hotData;

superagent.get('https://s.weibo.com/top/summary?cate=realtimehot')
  .end((err, res) => {
    if (err) {
      // 如果访问失败
      console.log('抓取失败，', err);
    } else {
      hotData = {
        listData: getTitle(res),
        titleName: getNameAndImg()
      }
    }
  })

//获取图片路径和name
function getNameAndImg() {
  return {
    name: '微博热搜榜'
    // img:''
  };
}

// 获取热搜
function getTitle(res) {
  let hotTitle = [];
  let $ = cheerio.load(res.text);
  let i = 1;
  $('tbody').find('tr').each((index, element) => {
    let content = $(element).find('.td-02').children('a');
    let href = content.attr('href');
    if (href == 'javascript:void(0);') {
      return;
    }
    href = 'https://s.weibo.com/' + href;
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