const express = require('express');
const router = express.Router();
const pool = require('../db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

router.post('/', (req, res) => {
  let userData = req.body;

  let email = userData.email;
  let password = userData.password;
  let firstname = userData.firstname;
  let lastname = userData.lastname;

  const checkEmail = {
    text: 'SELECT firstname FROM users WHERE email = $1',
    values: [email],
  }
  pool.query(checkEmail, (err, results) => {
    if (results.rows[0]) {
      console.log('User already exists.');
      res.send({
        code: 401,
        error: 'User already exists.'
      });
    } else if (err) {
      res.send({
        error: err
      });
    } else {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log("There was an error hashing the user's password.");
        } else {
          const hashedPassword = hash;
          const confirmStringPreSlice =
            Math.random()
              .toString(36)
              .slice(2) +
            Math.random()
              .toString(36)
              .slice(2);
          const confirmString = confirmStringPreSlice.slice(-15);
          const query = {
            text: 'INSERT INTO users(email, password, firstname, lastname, confirm_string) VALUES($1, $2, $3, $4, $5)',
            values: [email, hashedPassword, firstname, lastname, confirmString]
          }
          pool.query(
            query,
            (err, results) => {
              if (err) {
                const response = { data: null, message: err.message };
                console.log(response);
                res.send(response);
              } else {
                const responseBody = {
                  userId: results.rows.insertId,
                  code: 200,
                  success: 'User registered sucessfully'
                };
                console.log(responseBody);
                res.send(responseBody);
              }
            }
          );
          const msg = {
            to: email,
            from: 'zach@basketballapp.com',
            subject: 'confirm your account with Basketball App',
            text: 'no text, using html instead',
            html: `<h4 style="color: green";">whats up ${firstname}!</h4><p>Click <a href='http://localhost:3000/userconfirmation/ipvtw0vfmlvh5fk2s/${confirmString}'>here</a> to confirm your email.</p><p>- Zach White</p>`
          };
          sgMail.send(msg).then(console.log('email sent'));
        }
      });
    }
  });
});

module.exports = router;
