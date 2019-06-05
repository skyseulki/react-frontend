const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    restaurants: [{
        id: String,
        name: String
    }]
})

module.exports = mongoose.model('User', UserSchema)