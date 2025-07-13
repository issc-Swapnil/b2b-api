const http = require('http');
const app = require('./index');
const port = process.env.PORT || 5000;
const server = http.createServer(app);
// // listen post number
//  server.listen(process.env.PORT || 3000);
server.listen(port, () => {
     console.log("App is running on port " + port);
});
/* server.listen(process.env.PORT || 3000, function () {
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
}); */