let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let subscriptionSchema = new Schema({
    web: Object,
    userId: String
})

let Subscription = new mongoose.model('subscription',subscriptionSchema)

module.exports = Subscription