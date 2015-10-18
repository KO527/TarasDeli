var express = require("express");
var path = require('path');
var app = express();




//  app.use('/', express.static('/Users/KO527/Sites/TarasDeli'));
//  app.use('/TarasPhotos', express.static('/Users/KO527/Sites/TarasDeli/TarasPhotos'));
//  app.use(express.static('/Users/KO527/Sites/TarasDeli/index'));

//  app.get('/', function(req, res){
//      res.sendFile(path.join(__dirname, './index', '/index.html'));
//   });

// app.use(express.static('/Users/KO527/Sites/TarasDeli/Contact'));

// app.get('/Contact', function(req, res){
//     res.sendFile(path.join(__dirname, './Contact', '/Contact.html'));
// });

app.use('/', express.static('/public_html'));

app.use('/TarasPhotos', express.static('/public_html/TarasPhotos'));

app.use(express.static('/public_html/index'));
app.get('/', function(req, res){
 	res.sendFile(path.join(__dirname, './index', '/index.html'));
});
app.use(express.static('/public_html/Contact'));

app.get('/Contact', function(req, res){
 	res.sendFile(path.join(__dirname, './Contact', '/Contact.html'));
});

app.listen(8080);

