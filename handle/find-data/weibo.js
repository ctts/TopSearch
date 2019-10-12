const superagent = require('superagent');
const cheerio = require('cheerio');
const weiboURL = require('../websURL/url').weiboURL;
let findWebId = require('../../mongoose/operations/findWebId');
let insertHotData = require('../../mongoose/operations/insertHotData');

let result = null;

function getdata() {
    superagent.get(weiboURL).end((err, res) => {
        if (err) {
            // 如果访问失败
            console.log('抓取失败，', err);
        } else {
            result = {
                listData: getTitle(res),
            }
            console.log(result)
        }
    })
}

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

// 入口
let getalldata = async function (webname, url) {
    let webId = await findWebId(webname)
    let hotData = await getWebData(url)
    let result = await getData(hotData, webId)
    return await insertHotData(result)
}

module.exports = getalldata