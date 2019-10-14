const cheerio = require('cheerio');

function getData(html) {
    let hotTitle = [];
    let $ = cheerio.load(html.text);
    $('td').find('a.list-title').each((index, element) => {
        let content = $(element);
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