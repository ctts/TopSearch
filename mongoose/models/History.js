let mongoose = require('mongoose')

let Schema = mongoose.Schema

let historySchema = new Schema({
    username: String,
    info: [{
        webId: String,
        infoURL: String,
        infoContent: String,
        time: {
            type: Date,
            default: Date.now
        },
    }]
})

let History = mongoose.model('history', historySchema);

module.exports = History