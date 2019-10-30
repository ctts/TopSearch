var express = require('express');
var router = express.Router();
const getallweb = require('../mongoose/operations/getallweb')
const getSubscriptionByName = require('../mongoose/operations/getSubscriptionByName')

// 若用户名存在
router.get('/:username', function (req, res) {
    let username = req.params.username
    dealEvent(username).then((result) => {
        res.send(result)
    })
});

// 若用户名不存在
router.get('/', function (req, res) {
    dealEvent().then((result) => {
        res.send(result)
    })
});

async function dealEvent(username) {
    let websites = await getallweb()
    // 若没有用户名，直接返回所有站点；若存在，则查找订阅
    if (username) {
        let subscription = await getSubscriptionByName(username)
        console.log(subscription)
        // 若存在订阅
        if (subscription) {
            subscription = subscription.webs

            // 判断用户是否订阅
            let result = websites.map(modal => {
                modal = modal.toObject()
                modal.status = subscription.includes(modal.webname)
                return modal
            })
            return result
        } else {
            return websites
        }
    } else {
        return websites
    }
}

module.exports = router