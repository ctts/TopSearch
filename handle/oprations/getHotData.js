const webs = require('../websURL/url');
let findWebId = require('../oprations/findWebId');
let insertHotData = require('../oprations/insertHotData');
let getWebHTML = require('../oprations/getWebHTML');



// 入口
let getdata = async function (webname) {
    let webId = await findWebId(webname)
    let html = await getWebHTML(webs[webname].url)
    let result = await webs[webname].func(html, webId)
    // console.log(result)
    return await insertHotData(result)
}

module.exports = getdata