const cheerio = require('cheerio');

function getData(html, webId) {
    let hotTitle = [];
    let $ = cheerio.load(html.text);
    let infoNumber = 1;
    $('td').find('a.list-title').each((index, element) => {
        let content = $(element);
        let infoURL = content.attr('href');
        let infoContent = content.text();
        let hot = {
            webId,
            infoNumber,
            infoContent,
            infoURL,
        }
        infoNumber++;
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;