var express = require('express');
var router = express.Router();
const insertHistory = require('../mongoose/operations/insertHistory')
const getHistory = require('../mongoose/operations/getHistory')
const getWeb = require('../mongoose/operations/getWebById')

// 插入记录
router.use('/insertHistory', function (req, res) {
    let data = req.body
    let username = data.username
    if (username) {
        let info = {
            webId: data.webId,
            infoURL: data.infoURL,
            infoContent: data.infoContent
        }
        insertHistory(username, info).then(() => {
            res.send('success')
        })
    } else {
        res.send('failed')
    }

});

router.get('/getHistory/:username', function (req, res) {
    let username = req.params.username
    returnHistory(username).then((result) => {
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.send([])
    })
});

// 返回数据
async function returnHistory(username) {
    let historyData = await getHistory(username)
    if (historyData) {
        historyData = historyData.toObject() //将mongoose返回的对象转化为可操作对象
        historyData.info = historyData.info.slice(-50).reverse() //返回最新的50条数据
        for (let info of historyData.info) {
            let web = await getWeb(info.webId)
            info['webname'] = web.webname
            info['weblogo'] = web.weblogo
        }
        return Promise.resolve(historyData)
    } else {
        return Promise.reject()
    }
}

module.exports = router