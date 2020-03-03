const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('.lst-2').children('.bx').first().find('li').each((index, element) => {
        let content = $(element).children('a');
        let infoContent = content.text();
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