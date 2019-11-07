const listItem = require('../models/ListItem')
const getWebId = require('../operations/getWebIdByName')

// 根据网站名获取
async function getDatabaseHotData(webname) {
    let webId = webname ? await getWebId(webname) : ''
    let result = await new Promise((reslove, reject) => {
        if (webId) {
            listItem.find({
                webId
            }, (err, docs) => {
                if (!err) {
                    reslove(docs)
                } else {
                    reject(err)
                }
            })
        } else {
            // 若传入空，则返回所有数据
            listItem.find({}, (err, docs) => {
                if (!err) {
                    reslove(docs)
                } else {
                    reject(err)
                }
            })
        }
    })
    return result
}

module.exports = getDatabaseHotData