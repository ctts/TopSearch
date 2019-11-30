const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('.feed-main-con').find('#feed-main-list').find('.feed-block-title').each((index, element) => {
        let content = $(element).find('a')
        let infoContent = content.attr('title');
        let infoURL = content.attr('href');
        let hot = {
            infoContent,
            infoURL
        }
        data.push(hot);
    })
    return data;
}

module.exports = getData