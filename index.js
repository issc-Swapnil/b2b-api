const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require('./api/connection');

const blogRoutes = require('./api/routes/BlogRoutes');
const articleRoutes = require('./api/routes/ArticleRoutes')
const assetsRoutes = require('./api/routes/AssetsRoutes')
const adsRoutes = require('./api/routes/AdsRoutes')
const fileRoutes = require('./api/routes/FileRoutes')
const newsRoutes = require('./api/routes/NewsRoutes')
const contactRoutes = require('./api/routes/ContactRoutes')
const subscriberRoutes = require('./api/routes/SubscriberRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());;

var cors = require("cors");

app.use(cors());
app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     );
     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
     if (req.method === "OPTIONS") {
          res.header("Access-Control-Allow-Methods", "*");
          res.header("Access-Control-Allow-Credentials: true");
          return res.status(200).json({});
     }
     next();
});
app.get('/', (req, res) => {
     res.json({ massage: "Welcome to B2B Network Services. " });
});

app.use("/blogs", blogRoutes);
app.use("/articles", articleRoutes);
app.use("/assets", assetsRoutes);
app.use("/ads", adsRoutes);
app.use("/upload", fileRoutes);
app.use("/news", newsRoutes);
app.use("/contact", contactRoutes);
app.use("/subscriber", subscriberRoutes);


app.use((req, res, next) => {
     const error = new Error("Not found");
     error.status = 404;
     next(error);
});

app.use((error, req, res, next) => {
     console.log(error);
     res.status(error.status || 500);
     res.json({
          error: {
               message: error.message
          }
     });
});

module.exports = app;