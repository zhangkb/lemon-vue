var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    name: String,
    paw: String,
    sex: String,
    age: Number,
    loginDate: Date,
});

module.exports = mongoose.model('User',UserSchema);
