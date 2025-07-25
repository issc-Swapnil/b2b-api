const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: {
        type: String, required: false
    },
     email: {
        type: String, required: true
    },
    contactNumber: {
        type: String, required: true
    },
    comments: {
        type: String,                   
        required: true
    },
},{ timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
