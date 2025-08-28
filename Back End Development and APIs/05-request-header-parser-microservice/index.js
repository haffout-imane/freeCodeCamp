// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// helper to safely get the client's IP address
function getClientIP(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    return xff.split(',')[0].trim();
  }
  const remote = req.socket.remoteAddress || req.connection?.remoteAddress;
  if (!remote) return '';
  return remote.replace(/^::ffff:/, '');
}

// API endpoint to return IP, language, and software
app.get('/api/whoami', (req, res) => {
  const ipaddress = getClientIP(req);
  const language = (req.headers['accept-language'] || '').split(',')[0];
  const software = req.headers['user-agent'] || '';

  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
