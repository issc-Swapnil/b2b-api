const express = require('express');
const Subscriber = require('../models/Subscriber');
const router = express.Router();

// Create a subscriber
router.post('/', async (req, res) => {
  try {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.status(201).json(subscriber);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Subscriber
router.get('/', async (req, res) => {
  try {
    const subscriber = await Subscriber.find().sort();
    res.json(subscriber);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

