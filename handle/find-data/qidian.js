const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('.book-img-text').find('.book-mid-info').find('h4').each((index, element) => {
        let content = $(element).children('a');
        let infoContent = content.text();
        let infoURL = `https:` + content.attr('href');
        let hot = {
            infoContent,
            infoURL
        }
        data.push(hot);
    })
    return data;
}

module.exports = getData