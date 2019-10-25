var express = require('express');
var router = express.Router();
const insertHistory = require('../mongoose/operations/insertHistory')
const getHistory = require('../mongoose/operations/getHistory')
// const getWeb = require()

/* GET home page. */
router.use('/insertHistory', function (req, res) {
    let data = req.body
    let username = data.username
    let info = {
        webId: data.webId,
        infoURL: data.infoURL,
        infoContent: data.infoContent
    }
    insertHistory(username, info).then(() => {
        res.send('success')
    })
});

router.get('/getHistory/:username', function (req, res) {
    let username = req.params.username
    getHistory(username).then((result) => {
        res.send({
            result
        })
    })
});

module.exports = router