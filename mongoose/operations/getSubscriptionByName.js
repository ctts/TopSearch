const subscription = require('../models/Subscription')

function getSubscript(username) {
    let promise = new Promise((resolve, reject) => {
        subscription.findOne({
            username
        }, (err, doc) => {
            if (!err) {
                resolve(doc)
            } else {
                reject(err)
            }
        })
    })
    return promise
}


module.exports = getSubscript