var express = require('express')
var router = express.Router()
const getDatabaseHotData = require('../mongoose/operations/getDatabaseHotData')



router.use('/:name', function (req, res) {
    let name = req.params.name
    getDatabaseHotData(name).then(result => {
        res.json(result)
    })
})

module.exports = router