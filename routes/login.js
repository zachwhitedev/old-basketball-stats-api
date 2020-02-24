const express = require('express');
const router = express.Router();
const pool = require('../pgConnect');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  let userData = req.body;

  let email = userData.email;
  let password = userData.password;

  const query =
    'SELECT id, email, firstname, lastname, password, is_confirmed FROM users WHERE email = ?';

  try {
    const data = await pool.query(query, [email])
    if (res.data[0].is_confirmed == 'false') {
      res.send({
        error: 'You must confirm your email account.'
      });
    } else if(res.data[0]){
      if (bcrypt.compareSync(password, res.data[0].password)) {
        const payload = {
          userid: res.data[0].id,
          useremail: res.data[0].email,
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname
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
    console.log(err)
  }
})

module.exports = router;