var express = require('express');
var fs = require("fs");
var util = require('util');
var file = fs.readFileSync('index.html');
var other  = fs.readFileSync('Product.png');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(file.toString('utf8'));
});

app.get('/Product.png', function(request, response) {
  fs.stat('Product.png', function(error, stat) {
    var rs;
    response.writeHead(200, { 'Content-Type': 'image/png','Content-Length' : stat.size});
    rs = fs.createReadStream('Product.png');
    util.pump(rs, response, function(err) {
      if (err) {
        throw err;
      }
  });
  });
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
