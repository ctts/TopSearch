const history = require('../models/History')

// 找出历史记录
function getHistory(username) {
    let promise = new Promise((resolve, reject) => {
        history.findOne({
            username,
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

module.exports = getHistory