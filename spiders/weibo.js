const express = require('express');
const app = express();
const superagent = require('superagent');
const cheerio = require('cheerio');

let hot = [];

superagent.get('https://s.weibo.com/top/summary?cate=realtimehot')
    .set('Content-Type', 'text/plain;charset=utf-8')
    .end((err, res) => {
        if (err) {
            // 如果访问失败
            console.log('抓取失败，', err);
        } else {
            hot = getTitle(res);
        }
    })

function getTitle(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);

    $('tbody').find('tr').each((index, element) => {
        let content = $(element).find('.td-02').children('a');
        let href = content.attr('href');
        if (href == 'javascript:void(0);') {
            return
        }
        href = 'https://s.weibo.com/' + href;
        let hot = {
            title: content.text(),
            url: href
        }
        hotTitle.push(hot);
    })
    console.log(hotTitle.length)
    return hotTitle;
}

app.get('/weibo', async (req, res, next) => {
    res.send(hot);
});


// 开启服务器，监听3000端口
let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
})