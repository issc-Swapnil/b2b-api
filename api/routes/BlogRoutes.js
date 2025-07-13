const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Create a blog
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 });
    res.json({
      message: 'Published blogs fetched successfully',
      data: blogs
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch published blogs',
      error: err.message
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found',
        data: null
      });
    }
    res.json({
      message: 'Blog fetched successfully',
      data: blog
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch blog',
      error: err.message
    });
  }
});


module.exports = router;
