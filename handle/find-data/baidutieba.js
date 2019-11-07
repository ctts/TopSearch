const cheerio = require('cheerio');

function getData(html) {
    let hotTitle = [];
    let $ = cheerio.load(html.text);
    $('.topic-top-list').find('li').each((index, element) => {
        let content = $(element).find('.topic-name').find('a')
        let infoURL = content.attr('href');
        let infoContent = content.text();
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;