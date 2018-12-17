const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: String,
    paw: String,
    sex: String,
    age: Number,
    loginDate: Date,
}, {
    collection: 'user'
});

module.exports = mongoose.model('User',Users);
