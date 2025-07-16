const express = require('express');
const router = express.Router();
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');


// Declare AWS Credentials below
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});
// Start Image Upload image
const imageUploader = multer({
    storage: multerS3({
         s3: s3,
         bucket: process.env.AWS_BUCKET_NAME,
         acl: 'public-read',
         ContentDisposition: 'inline',
         key: function (req, file, cb) {
               const fileName = Date.now().toString() + '-' + file.originalname;
               const folder = 'b2b-images/';
               cb(null, folder + fileName); // S3 key will be: images/123456-myimage.jpg
          },
    }),
    limits: { fileSize: 10000000 }, // In bytes: 10000000 bytes = 10 MB
}).single('image');

router.post('/', (req, res) => {
    imageUploader(req, res, async (error) => {
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
       } else {
            // If File not found gives msg
            if (req.file === undefined) {
                 console.log('Error: No File Selected!');
                 res.status(201).json('Error: No File Selected');
            } else {
                 // If Success
                 const imageLocation = req.file.location;// Save the file name into database into profile modelres.json
               try {
                     res.status(200).json({ 
                        "message":"Image Upload Successfully",
                        "imageUrl":imageLocation 
                    }) 
               } catch (error) {
                    console.log(error);
                    res.status(500).json({
                         message: error
                    })
               }
            }
       }
    })
 }); 

 module.exports = router;