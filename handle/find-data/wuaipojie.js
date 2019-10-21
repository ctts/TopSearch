const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('tbody').find('tr').each((index, element) => {
        let content = $(element).find('.common').children('a');
        let infoContent = content.text();
        let infoURL = content.attr('href');
        if (!infoURL) {
            return
        }
        infoURL = 'https://www.52pojie.cn/' + infoURL
        let hot = {
            infoContent,
            infoURL
        }
        data.push(hot);
    })
    return data;
}

module.exports = getData