const express = require('express');
const Contact = require('../models/Contacts');
const router = express.Router();

// Create a Assets
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Assets
router.get('/', async (req, res) => {
  try {
    const contact = await Contact.find().sort();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
