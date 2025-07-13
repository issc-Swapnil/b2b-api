const mongoose = require("mongoose");
require('dotenv').config()
const databaseURL = process.env.MD_URL || ""
//connect DB HERE
mongoose.connect(databaseURL).then(() => {
  console.log('Connection Success');
}).catch((e) => {
  console.log('No Connection');
})