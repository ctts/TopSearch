const cheerio = require('cheerio');

// 获取数据
function getData(html) {
    let data = [];
    let $ = cheerio.load(html.text);
    $('.app-top-list').find('.taptap-top-card').each((index, element) => {
        let content = $(element).find('.card-middle-title ');
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