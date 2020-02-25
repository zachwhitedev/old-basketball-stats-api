const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const pool = require('./db');

const app = express();

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 500, // max requests allowed per windowMS
  message: 'You are making too many requests. Please wait 30 minutes and try again.'
})

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const confirmEmail = require('./routes/confirmEmail');
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/confirmuser', confirmEmail);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/showusers', async (req, res) => {
//   const text = 'SELECT id, email, firstname, lastname FROM users'
//   try {
//     const data = await pool.query(text)
//     res.send(data.rows)
//   } catch (err) {
//     res.send(err)
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
