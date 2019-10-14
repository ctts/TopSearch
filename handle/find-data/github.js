const cheerio = require('cheerio');

function getData(res) {
    let hotTitle = [];
    let $ = cheerio.load(res.text);
    $('.Box-row').find('h1').find('a').each((index, element) => {
        let content = $(element);
        let infoURL = 'https://github.com' + content.attr('href');
        let infoContent = content.attr('href').substring(1);
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;