// server.js
const express = require('express');
const app = express();

// Enable CORS for FCC testing
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (optional)
app.use(express.static('public'));

// Root route: display a simple HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  let date;

  // If no date is provided, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if dateString is a number (unix timestamp)
    if (/^\d+$/.test(dateString)) {
      // Convert string to number
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, try parsing as date string
      date = new Date(dateString);
    }
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
