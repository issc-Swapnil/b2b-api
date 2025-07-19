require('dotenv').config();
const express = require('express');
const router = express.Router();

const part1 = "0fe12b422";
const part2 = "fc34a63a8";
const part3 = "3386e94d";
const part4 = "434e57";


router.get('/b2b-news', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=B2B%20Lead%20Generation&language=en&pageSize=10&apiKey=${part1 + part2 + part3 + part4}`;

    const response = await axios.get(url);

    res.json({
      message: 'News fetched successfully',
      data: response.data.articles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
