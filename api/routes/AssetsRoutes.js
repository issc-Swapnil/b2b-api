const express = require('express');
const Assets = require('../models/Assets');
const router = express.Router();

// Create a Assets
router.post('/', async (req, res) => {
  try {
    const asset = new Assets(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Assets
router.get('/', async (req, res) => {
  try {
    const assets = await Assets.find().sort();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
