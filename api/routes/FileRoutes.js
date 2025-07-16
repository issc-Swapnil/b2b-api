const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const router = express.Router();
require('dotenv').config();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Configure multer to use S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read', // Makes uploaded file public
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = Date.now().toString() + '-' + file.originalname;
      const folder = 'b2b-images/';
      cb(null, folder + fileName); // S3 key will be: images/123456-myimage.jpg
    },
  }),
});
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image not provided' });
  }

  return res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl: req.file.location,
  });
});

module.exports = router;