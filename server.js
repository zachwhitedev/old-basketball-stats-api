const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ratelimits = require('./ratelimits');
require('dotenv').config();
const pool = require('./db');
const admin = require('./adminQueries');

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

app.post('/rolandfinance', (req, res) => {
  const userEmail = req.body.email;
  const query = {
    text:
      'INSERT INTO rfbsubs(email) VALUES($1)',
    values: [userEmail]
  };
  pool.query(query, (err, results) => {
    if (err) {
      const response = { data: null, message: err.message };
      console.log(response);
      res.send(response);
    } else {
      const responseBody = {
        userId: results.rows.insertId,
        code: 200,
        success: 'User subscribed sucessfully'
      };
      res.send(responseBody);
    }
  });
})

app.get('/showusers', ratelimits.test, async (req, res) => {
  try {
    const data = await admin.getUsers();
    res.send(data.rows);
  } catch (err) {
    res.send(err);
  }
});

app.delete('/deleteusers', ratelimits.test, async (req, res) => {
  try {
    const data = await admin.deleteUsers();
    console.log(data);
    res.send('Users deleted. User table empty.');
  } catch (err) {
    res.send(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
