const mongoose = require('mongoose');

const AssetDownloadForm = new mongoose.Schema({
    assetId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    communication: {
        type: String,
        enum: ['phone', 'email', 'both'],
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('AssetDownloadForm', AssetDownloadForm);
