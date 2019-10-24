var express = require('express');
var router = express.Router();
var users = require('../mongoose/models/User');
var jwt = require('jsonwebtoken');
const SECRET = require('../public/javascripts/global').SECRET

// 生成token
function createToken(user) {
    let username = user.username
    let token = jwt.sign({
        username
    }, SECRET, {
        // 过期时间7天
        'expiresIn': 60 * 60 * 24 * 7
    })
    return token
}

// 插入用户
function insertUser(user) {
    let promise = new Promise((resolve, reject) => {
        users.create(user, (err) => {
            if (!err) {
                console.log('插入成功')
                resolve()
            } else {
                console.log('插入失败')
                reject()
            }
        })
    })
    return promise
}

/*
    查找用户
    return
    0:密码错误
    1:登录成功
    2:注册成功
*/
function findUser(user) {
    let promise = new Promise((resolve, reject) => {
        users.findOne({
            username: user.username
        }).then(res => {
            if (res) {
                // 若存在该用户，对比密码，若密码正确，返回成功，否则返回密码错误
                if (res.password === user.password) {
                    resolve(1)
                } else {
                    // 登录失败
                    reject(0)
                }
            } else {
                // 否则开始注册用户
                resolve(2)
            }
        })
    })

    // 判断若没有该用户则插入,若注册成功或登录成功，验证token
    promise.then((value) => {
        if (value === 2) {
            return insertUser(user).then(() => {
                return Promise.resolve(2)
            })
        }
    })

    return promise
}

/* GET users listing. */
router.post('/', function (req, res) {
    let data = req.body;
    let result = findUser(data);
    let token = '';
    result.then((val) => {
        token = createToken(data)
        // 返回完成
        res.json({
            "result": val,
            "token": token
        })
    }).catch(err => {
        console.log(err)
        //密码错误
        res.json({
            "result": err,
        })
    })
});

module.exports = router;