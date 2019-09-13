let mongoose = require('mongoose')

let Schema = mongoose.Schema

let historySchema = new Schema({
    username: String,
    time: Date,
    web: Object,
    url: String
})

let History = mongoose.model('history', historySchema);

module.exports = History