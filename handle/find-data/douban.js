const cheerio = require('cheerio');
const doubanURL = require('../websURL/url').doubanURL
const URL = require('url')
const urlObj = URL.parse(doubanURL)
let findWebId = require('../../mongoose/operations/getWebId')
let getWebHTML = require('../oprations/getWebHTML')
let packingData = require('../oprations/packingData')
let insertHotData = require('../../mongoose/operations/insertHotData')

let hotTitle = [];

// 获取热搜
function getTitle(html) {
    let $ = cheerio.load(html.text);
    $('.item').find('.info').find('.hd').each((index, element) => {
        let content = $(element).find('a')
        let infoURL = 'https:' + content.attr('href')
        let infoContent = content.find('.title').first().text()
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
}


async function getdata() {
    let webId = await findWebId('douban')
    let maxPage = 10
    let url = doubanURL
    for (let i = 0; i < maxPage; i++) {
        url.replace(/\bstart=\b\d+/, 25 * i)
        let html = await getWebHTML(url, urlObj)
        await getTitle(html)
        await setTimeout(() => {}, 300);
    }
    let result = await packingData(hotTitle, webId)
    return await insertHotData(result)
}

module.exports = getdata;