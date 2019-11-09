const cheerio = require('cheerio');

function getData(html) {
    let hotTitle = [];
    let $ = cheerio.load(html.text);
    $('.indent').find('table').find('.pl2').each((index, element) => {
        let content = $(element).find('a')
        let infoURL = content.attr('href')
        let infoContent = content.find('span').text()
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;