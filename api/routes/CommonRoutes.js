const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Contact = require('../models/Contacts');
const Blog = require('../models/Blog');
const Subscriber = require('../models/Subscriber');
const ArticleRoutes = require('../models/Articles');
const Asset = require('../models/Assets');
const User = require('../models/User');

const router = express.Router();

// Get all summary counts
router.get('/getSummery', async (req, res) => {
  try {
    const [
      contactCount,
      blogCount,
      publishedBlogs,
      unpublishedBlogs,
      subscriberCount,
      articleCount,
      assetCount,
      exclusiveAssetCount
    ] = await Promise.all([
      Contact.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ published: true }),   // Published blogs
      Blog.countDocuments({ published: false }),  // Unpublished blogs
      Subscriber.countDocuments(),
      ArticleRoutes.countDocuments(),
      Asset.countDocuments(),
      Asset.countDocuments({ isExclusive: true })
    ]);

    res.json({
      contacts: contactCount,
      blogs: blogCount,
      publishedBlogs,
      unpublishedBlogs,
      subscribers: subscriberCount,
      articles: articleCount,
      assets: assetCount,
      exclusiveAssets: exclusiveAssetCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_KEY || 'defaultsecret', // fallback for local
      { expiresIn: '10h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
