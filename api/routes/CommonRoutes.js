const express = require('express');
const Contact = require('../models/Contacts');
const Blog = require('../models/Blog');
const Subscriber = require('../models/Subscriber');
const ArticleRoutes = require('../models/Articles');
const Asset = require('../models/Assets');

const router = express.Router();

// Get all summary counts
router.get('/getSummery', async (req, res) => {
  try {
    const [
      contactCount,
      blogCount,
      publishedBlogs,
      unpublishedBlogs,
      subscriberCount,
      articleCount,
      assetCount
    ] = await Promise.all([
      Contact.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ published: true }),   // Published blogs
      Blog.countDocuments({ published: false }),  // Unpublished blogs
      Subscriber.countDocuments(),
      ArticleRoutes.countDocuments(),
      Asset.countDocuments()
    ]);

    res.json({
      contacts: contactCount,
      blogs: blogCount,
      publishedBlogs,
      unpublishedBlogs,
      subscribers: subscriberCount,
      articles: articleCount,
      assets: assetCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
