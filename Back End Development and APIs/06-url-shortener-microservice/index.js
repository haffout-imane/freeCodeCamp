require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // <--- require body-parser
const dns = require('dns');
const { URL } = require('url');

const app = express(); // <--- app must be defined BEFORE using it

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // <--- now safe

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// --------------------
// URL Shortener logic
// --------------------
const urlDatabase = [];
let counter = 1;

app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;

  let hostname;
  try {
    const urlObj = new URL(original_url);
    hostname = urlObj.hostname;
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, (err) => {
    if (err) return res.json({ error: 'invalid url' });

    const short_url = counter++;
    urlDatabase.push({ original_url, short_url });
    res.json({ original_url, short_url });
  });
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const short_url = Number(req.params.short_url);
  const entry = urlDatabase.find(e => e.short_url === short_url);

  if (!entry) return res.json({ error: 'No short URL found for given input' });

  res.redirect(entry.original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
