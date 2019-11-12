const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('.bbsHotPit').find('.list').find('li').each((index, element) => {
        let content = $(element).find('a');
        let infoContent = content.attr('title');
        let infoURL = content.attr('href');
        infoURL = `https://bbs.hupu.com` + infoURL
        let hot = {
            infoContent,
            infoURL
        }
        data.push(hot);
    })
    return data;
}

module.exports = getData