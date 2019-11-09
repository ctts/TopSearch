const web = require('../models/Web')

function createWebs({
    webname = "",
    weblocalname = "",
    weblogo = "",
    tag = "other"
}) {
    web.create({
        webname,
        weblocalname,
        weblogo,
        tag
    })
}

module.exports = createWebs