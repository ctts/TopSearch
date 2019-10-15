var express = require('express');
var router = express.Router();
const acceptImages = require('../public/javascripts/acceptImages')

function acceptImagesSuccess(err, obj) {
    if (!err) {
        console.log(obj)
    }
}

/* GET home page. */
router.use('/', function (req, res) {
    console.log(req)
    acceptImages(req, acceptImagesSuccess)
    res.send('success')
});

module.exports = router;