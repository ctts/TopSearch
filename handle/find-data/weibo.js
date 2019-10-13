const cheerio = require('cheerio');

// 获取数据
function getData(html, webId) {
    let data = [];
    let $ = cheerio.load(html.text);
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

module.exports = getData