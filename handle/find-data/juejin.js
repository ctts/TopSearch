const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('.entry-list').find('li').each((index, element) => {
        let content = $(element).find('.title');
        let infoContent = content.text();
        let infoURL = `https://juejin.im/` + content.attr('href');
        let hot = {
            infoContent,
            infoURL
        }
        data.push(hot);
    })
    return data;
}

module.exports = getData