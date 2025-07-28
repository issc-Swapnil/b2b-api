const express = require('express');
const Articles = require('../models/Articles');
const router = express.Router();

// Create a Assets
router.post('/', async (req, res) => {
  try {
    const article = new Articles(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Article
router.get('/', async (req, res) => {
  try {
    const articles = await Articles.find().sort();
    res.json({
      message: 'Articles fetched successfully',
      data: articles
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch articles',
      error: err.message
    });
  }
});

// Get Article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete article
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({
        message: 'Article not found',
        data: null
      });
    }
    res.json({
      message: 'Article deleted successfully',
      data: deletedArticle
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete article',
      error: err.message
    });
  }
});

module.exports = router;
