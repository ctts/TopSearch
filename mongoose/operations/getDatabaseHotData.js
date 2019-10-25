const listItem = require('../models/ListItem')
const getWebId = require('../operations/getWebIdByName')

// 根据网站名获取
async function getDatabaseHotData(webname) {
    let webId = await getWebId(webname)
    let result = await new Promise((reslove, reject) => {
        listItem.find({
            webId
        }, (err, docs) => {
            if (!err) {
                reslove(docs)
            } else {
                reject(err)
            }
        })
    })
    return result
}

module.exports = getDatabaseHotData