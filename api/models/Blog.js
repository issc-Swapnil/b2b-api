const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  author: { type: String, required: true },
  tags: [String],
  category: { type: String },
  coverImage: { type: String },
  published: { type: Boolean, default: true },
  publishedAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
  readingTime: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
