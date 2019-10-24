const history = require('../models/History')
// 查询方法
const getHistory = require('../operations/getHistory')

// 更新
function updateHistory(username, info) {
    let promise = new Promise((resolve, reject) => {
        history.updateOne({
            username
        }, {
            $push: {
                info
            }
        }, (err, row) => {
            if (!err) {
                resolve(row)
            } else {
                reject(err)
            }
        })
    })
    return promise
}

// 创建
function createtHistory(username, info) {
    let promise = new Promise((resolve, reject) => {
        history.create({
            username,
            info,
        }, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
    return promise
}

// 入口
module.exports = async function (username, info) {
    let has = await getHistory(username)
    if (has) {
        return await updateHistory(username, info)
    } else {
        return await createtHistory(username, info)
    }
}