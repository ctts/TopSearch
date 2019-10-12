// 插入或更新数据
function insertDB(dataList) {
    let promise = new Promise((resolve, reject) => {
        listItem.create(dataList, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    return promise
}

module.exports = insertDB