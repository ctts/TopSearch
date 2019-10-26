var express = require('express');
var router = express.Router();
const addSubscription = require('../mongoose/operations/addSubscription')

// 更新
router.post('/update', function (req, res) {
    let data = req.body
    addSubscription(data.username, data.webname, data.type)
        .then(result => {
            res.send(result)
        }).catch(err => {
            console.log(err)
            res.send({
                ok: 0
            })
        })


});

module.exports = router