const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    author: { type: String, required: true },
    coverImage: {
        type: String, required: false
    },
    title: {
        type: String, required: true
    },
    content: {
        type: String,                   
        required: true
    },
},{ timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
