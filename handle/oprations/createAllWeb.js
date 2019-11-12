const createWebs = require('../../mongoose/operations/createWebs')
const allweb = require('../websURL/url')
const getWebByName = require('../../mongoose/operations/getWebByName')

async function createallweb() {
    for (let web in allweb) {
        let flag = await getWebByName(allweb[web].info.webname)
        if (!flag) {
            await createWebs(allweb[web].info)
        }
    }
    return 'success'
}

module.exports = createallweb