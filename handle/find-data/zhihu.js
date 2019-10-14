const cheerio = require('cheerio');

// 获取热搜
function getData(html) {
    let hotTitle = [];
    let $ = cheerio.load(html.text);
    $('.wrap').find('.box').each((index, element) => {
        let content = $(element).find('a')
        let infoURL = 'https://daily.zhihu.com' + content.attr('href');
        let infoContent = content.text()
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;