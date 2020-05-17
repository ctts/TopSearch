const webs = require('../websURL/url');
let findWebId = require('../../mongoose/operations/getWebIdByName');
let insertHotData = require('../../mongoose/operations/insertHotData');
let getWebHTML = require('../oprations/getWebHTML');
let packingData = require('../oprations/packingData')



// 入口
let getdata = async function ({
    name,
    header = {}
}) {
    let webId = await findWebId(name)
    if (!webs[name]) return
    let html = await getWebHTML(webs[name].url, header)
    let data = await webs[name].func(html)
    let result = await packingData(data, webId)
    if (result.length > 0) {
        return await insertHotData(result)
    } else {
        console.log('未取得数据')
    }
}

module.exports = getdata