var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/', function (req, res, next) {
    let data = req.body;
    console.log(data);
    res.send()
});

module.exports = router;