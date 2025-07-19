require('dotenv').config();
const express = require('express');
const NewsAPI = require('newsapi');
const router = express.Router();

const newsapi = new NewsAPI(process.env.NEWS_APIKEY);

router.get('/b2b-news', async (req, res) => {
  try {
    // Fetch news in the 'business' category with B2B-related keywords
    const response = await newsapi.v2.everything({
      q: 'B2B Lead Generation',
      language: 'en',
      pageSize: 10
    });
    res.json({
      message: 'News fetched successfully',
      data: response.articles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;