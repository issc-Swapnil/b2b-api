const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  sponsor: {
    type: String, // URL or path to sponsor logo/image
    required: false
  },
  readTime: {
    type: String, // e.g., "3 min read"
    required: false
  },
  type: {
    type: String,
    required: true,
    enum: ['blog', 'ad', 'announcement', 'guide', 'promotion'] // customize as needed
  },
  tags: {
    type: [String],
    default: []
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true // HTML or markdown content
  },
  category: {
    type: String,
    required: false // e.g., "Tech", "Health", "Finance"
  },
  coverImg: {
    type: String,
    required: false // URL/path to main image
  },
},{ timestamps: true });

module.exports = mongoose.model('Asset', AssetSchema);
