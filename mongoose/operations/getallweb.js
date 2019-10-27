const web = require('../models/Web')

function getallweb() {
    let promise = new Promise((resolve, reject) => {
        web.find({}, (err, doc) => {
            if (!err) {
                resolve(doc)
            } else {
                reject(err)
            }
        })

    })
    return promise
}

module.exports = getallweb