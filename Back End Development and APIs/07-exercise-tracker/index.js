const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory storage
const users = []; // { _id, username }
const exercises = []; // { userId, description, duration, date }

// Helper to generate unique IDs
const { v4: uuidv4 } = require('uuid');

// ---------------------
// POST /api/users
// ---------------------
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const _id = uuidv4();
  const newUser = { username, _id };
  users.push(newUser);
  res.json(newUser);
});

// ---------------------
// GET /api/users
// ---------------------
app.get('/api/users', (req, res) => {
  res.json(users);
});

// ---------------------
// POST /api/users/:_id/exercises
// ---------------------
app.post('/api/users/:_id/exercises', (req, res) => {
  const user = users.find(u => u._id === req.params._id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  let { description, duration, date } = req.body;
  if (!description || !duration) return res.status(400).json({ error: 'Description and duration required' });

  duration = Number(duration);
  date = date ? new Date(date) : new Date();
  if (isNaN(date)) date = new Date();

  const exercise = {
    description,
    duration,
    date: date.toDateString(),
    userId: user._id
  };
  exercises.push(exercise);

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id
  });
});

// ---------------------
// GET /api/users/:_id/logs
// ---------------------
app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.find(u => u._id === req.params._id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  let { from, to, limit } = req.query;
  let log = exercises.filter(e => e.userId === user._id);

  if (from) log = log.filter(e => new Date(e.date) >= new Date(from));
  if (to) log = log.filter(e => new Date(e.date) <= new Date(to));
  if (limit) log = log.slice(0, Number(limit));

  // map to expected output
  log = log.map(e => ({
    description: e.description,
    duration: e.duration,
    date: e.date
  }));

  res.json({
    username: user.username,
    count: log.length,
    _id: user._id,
    log
  });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
