const express = require('express');
const Ads = require('../models/Ads');
const router = express.Router();

// Create a Assets
router.post('/', async (req, res) => {
  try {
    const ads = new Ads(req.body);
    await ads.save();
    res.status(201).json(ads);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Assets
router.get('/', async (req, res) => {
  try {
    const ads = await Ads.find().sort();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
