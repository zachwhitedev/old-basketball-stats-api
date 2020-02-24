const express = require('express');
const router = express.Router();
const pool = require('../pgConnect');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  let userData = req.body;

  let email = userData.email;
  let password = userData.password;

  const query =
    'SELECT id, email, firstname, lastname, password, is_confirmed FROM users WHERE email = ?';
  pool.query(query, [email], (err, results, fields) => {
    if (results[0]) {
      if (results[0].is_confirmed == 'false') {
        res.send({
          error: 'You must confirm your email account.'
        });
      } else if (bcrypt.compareSync(password, results[0].password)) {
        const payload = {
          userid: results[0].id,
          useremail: results[0].email,
          firstname: results[0].firstname,
          lastname: results[0].lastname
        };
        console.log(payload);
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 30 * 60
        });
        res.send(token);
      } else {
        res.send({
          error: 'Email or password verification failed.'
        });
      }
    } else if (err) {
      res.send({
        error: err
      });
    } else {
      console.log('Something is messed up with login route.');
    }
  });
});

module.exports = router;
