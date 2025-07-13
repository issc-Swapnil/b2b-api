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
    res.json({
      message: 'Assets fetched successfully',
      data: assets
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch assets',
      error: err.message
    });
  }
});


// Get Article by ID
router.get('/:id', async (req, res) => {
  try {
    const asset = await Assets.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
