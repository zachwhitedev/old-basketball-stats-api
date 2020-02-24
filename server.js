const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const pool = require('./pgConnect');

const app = express();

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

app.get('/showusers', (req, res) => {
  const text = 'SELECT * from users'
  try {
    const data = await pool.query(text)
    res.send(data.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    res.send(err)
  }
});

console.log(pool);

// app.delete('/deleteusers', (req, res) => {
//   const query = `DELETE FROM users`;
//   pool.query(query, (err, results, fields) => {
//     if (err) {
//       const response = { data: null, message: err.message };
//       console.log(response);
//       res.send(response);
//     } else {
//       res.send('All users deleted. User table empty.');
//     }
//   });
// });

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
