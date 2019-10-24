let user = require('../models/User')

async function insertUserHead({
    username,
    userimg
}) {
    let promise = new Promise((resolve, reject) => {
        user.findOne({
            username
        }, (err, doc) => {
            if (!err) {
                doc.updateOne({
                    $set: {
                        userimg
                    }
                }, (error, raw) => {
                    if (!error && raw.ok === 1) {
                        resolve(userimg)
                    } else {
                        reject(err)
                    }
                })
            } else {
                reject(err)
            }
        })
    })
    return promise
}

module.exports = insertUserHead