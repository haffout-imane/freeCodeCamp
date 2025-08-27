var bodyParser = require('body-parser');
var express = require('express');
var app = express();
require('dotenv').config();

app.use('/public', express.static( __dirname + '/public' ) );

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function middleware(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.get('/name', function(req, res) {
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: `${first} ${last}` });
});


app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({"message": "HELLO JSON"});
  } else
    res.json({"message": "Hello json"})

});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.post('/name', function(req, res) {
  const first = req.body.first;
  const last = req.body.last;
  res.json({ name: `${first} ${last}` });
});


module.exports = app;
