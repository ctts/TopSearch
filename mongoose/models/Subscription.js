let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let subscriptionSchema = new Schema({
    username: String,
    webs: [String]
})

let Subscription = new mongoose.model('subscription', subscriptionSchema)

module.exports = Subscription