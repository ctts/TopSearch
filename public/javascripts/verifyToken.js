const SECRET = require('./global').SECRET
var jwt = require('jsonwebtoken');

// 验证token
function verifyToken(header) {
    let promise = new Promise((resolve, reject) => {
        let token = header['authorization']
        if (!token) {
            reject(false)
        }
        jwt.verify(token, SECRET, (error) => {
            if (error) {
                reject(false)
            } else {
                // console.log(result)
                resolve(true)
            }
        })
    })
    return promise
}

module.exports = verifyToken