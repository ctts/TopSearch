let web = require('../../mongoose/models/Web')

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
                console.log(result)
                resolve(result._id)
            }
        })
    })
    return promise
}

module.exports = findWebId