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
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

module.exports = router;
