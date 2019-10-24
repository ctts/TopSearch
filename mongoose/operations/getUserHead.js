let user = require('../models/User')

async function getUserHead(username) {
    let promise = new Promise((resolve, reject) => {
        user.findOne({
            username
        }, (err, doc) => {
            if (!err) {
                resolve(doc.get('userimg'))
            } else {
                reject(err)
            }
        })
    })
    return promise
}

module.exports = getUserHead