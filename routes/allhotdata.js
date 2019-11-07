var express = require('express');
var router = express.Router();
const getallhotdata = require('../mongoose/operations/getDatabaseHotData')

/* GET home page. */
router.get('/', function (req, res) {
    getallhotdata().then(val => {
        // 将对象的key值转化为values（配合前端插件）
        val = convertKey(val, {
            'infoContent': 'value'
        })
        // console.log(val)
        res.send(val)
    }).catch(err => console.log(err))
});

// 转化key值方法
function convertKey(arr, keyMap) {
    let tempString = JSON.stringify(arr);
    for (var key in keyMap) {
        var reg = `/"${key}":/g`;
        tempString = tempString.replace(eval(reg), '"' + keyMap[key] + '":');
    }
    return JSON.parse(tempString);
}


module.exports = router