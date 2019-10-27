let mongoose = require('mongoose')

let Schema = mongoose.Schema

let webSchema = new Schema({
    webname: String,
    weblogo: String,
    tag: String,
})

let Webs = mongoose.model('web', webSchema);

module.exports = Webs