const cheerio = require('cheerio');

// 获取热搜
function getData(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);
    $('.packery-item').each((index, element) => {
        let infoURL = 'http://www.qdaily.com' + $(element).find('a').attr('href');
        let infoContent = $(element).find('a').find('img').attr('alt');
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;