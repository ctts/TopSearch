const fs = require('fs')
const path = require('path')

function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback()
        } else {
            mkdirs(path.dirname(dirname), () => {
                fs.mkdir(dirname, callback)
            })
        }
    })
}

module.exports = mkdirs