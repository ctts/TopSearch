let web = require('../models/Web')

// 找到webid
function findWebId(webname) {
    let promise = new Promise((resolve, reject) => {
        web.findOne({
            webname
        }, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                // console.log(result)
                if (result) {
                    // 若网站存在
                    resolve(result._id)
                } else {
                    // 若不存在，则返回错误
                    // reject('网站不存在')
                    resolve(0)
                }
            }
        })
    })
    return promise
}

module.exports = findWebId