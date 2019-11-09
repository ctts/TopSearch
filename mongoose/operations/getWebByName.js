let web = require('../models/Web')

// 找到webid
function getWeb(webname) {
    let promise = new Promise((resolve, reject) => {
        web.findOne({
            webname
        }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                // 若网站存在
                resolve(result)
            }
        })
    })
    return promise
}

module.exports = getWeb