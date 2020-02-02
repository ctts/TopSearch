var express = require('express');
var router = express.Router();
const getSubscriptionByName = require('../mongoose/operations/getSubscriptionByName')

router.get('/:username', function (req, res) {
    let username = req.params.username
    getSubscriptionByName(username).then(bol => {
        res.json(bol)
    })
});


module.exports = router