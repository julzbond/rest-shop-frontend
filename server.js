var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var CONFIG = require('./config/config.json');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('shop');
});

// app.get('/products', function(req, res){
//   res.render('products');
// });

// app.get('/orders', function(req, res){
//   res.render('orders');
// });

app.listen(CONFIG.port, function(){
  console.log("Server is running");
});