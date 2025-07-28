const express = require('express');
const AssetForm = require('../models/AssetDownloadForm');
const Assets = require('../models/Assets');
const router = express.Router();
// const verifyToken = require('../middlewear/authMiddleware');

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

// download form data for Assets
router.post('/download', async (req, res) => {
  try {
    const asset_download_req = new AssetForm(req.body);
    await asset_download_req.save();
    res.status(201).json(asset_download_req);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//delete asset
router.delete('/:id', async (req, res) => {
  try {
    const deletedAsset = await Assets.findByIdAndDelete(req.params.id);
    if (!deletedAsset) {
      return res.status(404).json({
        message: 'Asset not found',
        data: null
      });
    }
    res.json({
      message: 'Asset deleted successfully',
      data: deletedAsset
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete asset',
      error: err.message
    });
  }
});

module.exports = router;
