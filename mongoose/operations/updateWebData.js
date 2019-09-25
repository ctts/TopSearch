const superagent = require('superagent');
const cheerio = require('cheerio');
let listItem = require('../../mongoose/models/ListItem')
let web = require('../../mongoose/models/Web')

const puppeteer = require('puppeteer');

// 向网站发起请求
function getWebData(url) {
    let promise = new Promise((resolve, reject) => {
        superagent.get(url)
            .end((err, res) => {
                if (err) {
                    // 如果访问失败
                    reject(err)
                } else {
                    resolve(res)
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

// 找到webid
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

// 插入或更新数据
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

// 主入口
let setData = async (webname, url) => {
    let webId = await findWebId(webname)
    let hotData = await getWebData(url)
    let result = await getData(hotData, webId)
    return await insertDB(result)

}

module.exports = setData