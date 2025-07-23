require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/b2b-news', async (req, res) => {
  try {
    const url = `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&q=B2B%20Lead%20Generation%2C%20B2B%20Advertising`;

    const response = await axios.get(url);

    res.json({
      message: 'News fetched successfully',
      data: response.data.results
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
