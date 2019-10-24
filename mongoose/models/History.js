let mongoose = require('mongoose')

let Schema = mongoose.Schema

let historySchema = new Schema({
    username: String,
    time: {
        type: Date,
        default: Date.now
    },
    webId: String,
    info: [{
        infoURL: String,
        infoData: String
    }]
})

let History = mongoose.model('history', historySchema);

module.exports = History