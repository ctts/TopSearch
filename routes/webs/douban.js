const express = require('express');
var router = express.Router();
const doubanURL = require('../websURL/url').doubanURL

const puppeteer = require('puppeteer');


let scrape = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200, //减速显示，有时会作为模拟人操作特意减速
    });
    const page = await browser.newPage();
    await page.goto(doubanURL);
    await page.waitFor(1121);

    const result = await page.evaluate(() => {
        let data = [];
        let $ = window.$;
        // 获取a标签;
        let elements = $('.hd a')
        elements.each((index, item) => {
            let elem = $(item)
            console.log(elem)
            data.push({
                'title': elem.find('span').text(),
                'href': elem.attr('href')
            })
        })
        return data
    })
    browser.close();
    return result
}


/* GET users listing. */
router.use('/', function (req, res, next) {
    let hotData = scrape();
    hotData.then((val)=>{
        res.send(val)
    })
});



module.exports = router;