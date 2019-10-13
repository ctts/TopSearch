let listItem = require('../../mongoose/models/ListItem')

// 查找所有同网站数据并删除
function deleteDB(webId) {
    let promise = new Promise((resolve, reject) => {
        // 直接删除，其实也可以设置一个隐藏字段
        listItem.remove({
            webId
        }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })

    return promise
}

// 插入数据
function insertDB(dataList) {
    let promise = new Promise((resolve, reject) => {
        listItem.create(dataList, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(result)
                resolve()
            }
        })
    })
    return promise
}

async function insertHotData(dataList) {
    let webId = dataList[0].webId
    await deleteDB(webId)
    await insertDB(dataList)
}

module.exports = insertHotData