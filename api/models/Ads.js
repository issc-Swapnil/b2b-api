const mongoose = require('mongoose');

const AdsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true // URL or path to the ad image
  },
  redirectUrl: {
    type: String,
    required: true // Where the user will be redirected when clicking the ad
  },
  isActive: {
    type: Boolean,
    default: true // Useful if you want to deactivate an ad without deleting it
  },
},{ timestamps: true });

module.exports = mongoose.model('Ad', AdsSchema);
