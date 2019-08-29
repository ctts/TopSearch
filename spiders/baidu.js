const express = require('express');
const app = express();
const superagent = require('superagent');
const cheerio = require('cheerio');
require('superagent-charset')(superagent)

let hot = [];

superagent.get('http://top.baidu.com/buzz?b=1&fr=topindex')
    .charset()
    .end((err, res) => {
        if (err) {
            // 如果访问失败
            console.log('抓取失败，', err);
        } else {
            // console.log(res.header)
            hot = getTitle(res);
        }
    })

function getTitle(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);

    $('td').find('a.list-title').each((index, element) => {
        let content = $(element);
        let href = content.attr('href');
        // if (href == 'javascript:void(0);') {
        //     return
        // }
        // href = 'https://s.weibo.com/' + href;
        let hot = {
            title: content.text(),
            url: href
        }
        hotTitle.push(hot);
    })
    console.log(hotTitle.length)
    return hotTitle;
}

app.get('/baiduHot', async (req, res, next) => {
    res.send(hot);
});


// 开启服务器，监听3000端口
let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
})