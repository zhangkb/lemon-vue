const mongoose = require('mongoose');

const Count = new mongoose.Schema({
    location: String, // 访问地址
    area: String,
    loginDate: Date, // 访问时间
}, {
    collection: 'count'
});

module.exports = mongoose.model('Count',Count);
