const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ratelimits = require('./ratelimits');
require('dotenv').config();
const pool = require('./db');

const app = express();

app.use(ratelimits.api);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const confirmEmail = require('./routes/confirmEmail');
app.use('/register', ratelimits.register, registerRoute);
app.use('/login', ratelimits.login, loginRoute);
app.use('/confirmuser', confirmEmail);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/showusers', ratelimits.test, async (req, res) => {
  const text = 'SELECT id, email, firstname, lastname FROM users'
  try {
    const data = await pool.query(text)
    res.send(data.rows)
  } catch (err) {
    res.send(err)
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
