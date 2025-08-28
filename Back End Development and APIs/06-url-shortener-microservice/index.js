const dns = require('dns');
const bodyParser = require('body-parser');
const { URL } = require('url');

// Middleware to parse POST body
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory store for URLs
const urlDatabase = [];
let counter = 1;

// POST endpoint to create short URL
app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;

  // Check valid URL format
  let hostname;
  try {
    const urlObj = new URL(original_url);
    hostname = urlObj.hostname;
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }

  // Check if hostname exists via DNS
  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    // Save to database
    const short_url = counter++;
    urlDatabase.push({ original_url, short_url });

    res.json({ original_url, short_url });
  });
});

// GET endpoint to redirect
app.get('/api/shorturl/:short_url', (req, res) => {
  const short_url = Number(req.params.short_url);
  const entry = urlDatabase.find(e => e.short_url === short_url);

  if (!entry) {
    return res.json({ error: 'No short URL found for given input' });
  }

  res.redirect(entry.original_url);
});
