const express = require('express');
const router = express.Router();
const pool = require('../db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  let userData = req.body;

  let email = userData.email;
  let password = userData.password;

    const query = {
      text: 'SELECT id, email, firstname, lastname, password, is_confirmed FROM users WHERE email = $1',
      values: [email]
    }

  try {
    const data = await pool.query(query)
    if (data.rows[0].is_confirmed == 'false') {
      res.send({
        error: 'You must confirm your email account.'
      });
    } else if(data.rows[0].is_confirmed == 'true'){
      if (bcrypt.compareSync(password, data.rows[0].password)) {
        const payload = {
          userid: data.rows[0].id,
          useremail: data.rows[0].email,
          firstname: data.rows[0].firstname,
          lastname: data.rows[0].lastname
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
    }
  } catch(err){
    res.send({
      error: 'User does not exist.'
    })
  }
})

module.exports = router;