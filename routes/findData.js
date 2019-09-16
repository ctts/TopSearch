var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const weiboURL = require('./websURL/url').weiboURL
let listItem = require('../mongoose/models/ListItem')
let web = require('../mongoose/models/Web')



function getWebData() {
    let promise = new Promise((resolve, reject) => {
        superagent.get(weiboURL)
            .end((err, res) => {
                if (err) {
                    // 如果访问失败
                    reject(err)
                } else {
                    resolve(res)
                    // hotData = getData(res, webId)
                }
            })
    })
    return promise
}


// 获取热搜
function getData(res, webId) {
    let data = [];
    let $ = cheerio.load(res.text);
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

function findWebId(webname) {
    let promise = new Promise((resolve, reject) => {
        web.findOne({
            webname
        }, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(result)
                resolve(result._id)
            }
        })
    })
    return promise
}

function insertDB(dataList) {
    let promise = new Promise((resolve, reject) => {
        listItem.create(dataList, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    return promise
}

let setData = async (webname) => {
    let webId = await findWebId(webname)
    let hotData = await getWebData(webId)
    let result = await getData(hotData, webId)
    return await insertDB(result)
}

/* GET users listing. */
router.use('/', function (req, res, next) {
    setData('weibo')
        .then((val) => {
            res.send(val)
        }).catch((err) => {
            console.log(err)
        })
});



module.exports = router;