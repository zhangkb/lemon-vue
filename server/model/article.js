const mongoose = require('mongoose');

const Articles = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    changeDate: Date,
    imgUrl: String,
}, {
    collection: 'article'
});

module.exports = mongoose.model('Article', Articles);
