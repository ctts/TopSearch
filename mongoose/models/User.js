let mongoose = require('mongoose')

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: String,
    password: String,
    userimg: String
})

let Users = mongoose.model('user', userSchema);

module.exports = Users