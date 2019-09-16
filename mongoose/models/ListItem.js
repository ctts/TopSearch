let mongoose = require('mongoose')

let Schema = mongoose.Schema

let ListItemSchema = new Schema({
    webId: Schema.Types.ObjectId,
    infoNumber: Number,
    infoURL: String,
    infoContent: String
})

let ListItem = mongoose.model('listitem', ListItemSchema);

module.exports = ListItem