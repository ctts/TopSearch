var express = require('express');
var router = express.Router();
const getSubscriptionByName = require('../mongoose/operations/getSubscriptionByName')

router.get('/:username/:webname', function (req, res) {
    let username = req.params.username
    let webname = req.params.webname
    isSubscription(username, webname).then(bol => {
        res.json(bol)
    })
});

async function isSubscription(username, webname) {
    return await getSubscriptionByName(username).then(res => {
        return res.webs.includes(webname)
    })
}

module.exports = router