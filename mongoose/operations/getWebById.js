let web = require('../models/Web')

// 找到webid
function getWeb(_id) {
    let promise = new Promise((resolve, reject) => {
        web.findOne({
            _id
        }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                // console.log(result)
                if (result) {
                    // 若网站存在
                    resolve(result)
                } else {
                    // 若不存在，则返回错误
                    reject('网站不存在')
                }
            }
        })
    })
    return promise
}

module.exports = getWeb