var express = require('express');
var router = express.Router();
const acceptImages = require('../public/javascripts/acceptImages')
const insertUserHead = require('../mongoose/operations/insertUserHead')

async function getUserImage(req) {
    let user = await acceptImages(req)
    let result = await insertUserHead(user)
    console.log(result)
    return result
}

/* GET home page. */
router.use('/', function (req, res) {
    getUserImage(req)
        .then(result => {
            res.send({
                userimg: result
            })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
});

module.exports = router;