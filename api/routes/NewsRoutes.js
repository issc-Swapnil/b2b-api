require('dotenv').config();
const express = require('express');
const NewsAPI = require('newsapi');
const router = express.Router();

const part1 = "0fe12b422";
const part2 = "fc34a63a8";
const part3 = "3386e94d";
const part4 = process.env.NEWS_APIKEY || "434e57";

function getKey() {
  return part1 + part2 + part3 + part4;
}

const newsapi = new NewsAPI(getKey());

router.get('/b2b-news', async (req, res) => {
  try {
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
