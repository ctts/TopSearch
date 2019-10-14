const superagent = require('superagent');
require('superagent-charset')(superagent)


// 向网站发起请求
function getWebHTML(url, options = {}) {
    let promise = new Promise((resolve, reject) => {
        superagent
            .get(url)
            .set(options)
            .charset()
            .end((err, res) => {
                if (err) {
                    // 如果访问失败
                    reject(err)
                } else {
                    resolve(res)
                }
            })
    })
    return promise
}

module.exports = getWebHTML