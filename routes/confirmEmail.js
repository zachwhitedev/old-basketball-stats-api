const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', (req, res) => {
  const confirmString = req.body.confirmstring;
  const query = {
    text: 'SELECT id, firstname, lastname, email FROM users WHERE confirm_string = $1',
    values: [confirmString]
  }
  pool.query(query, (err, results) => {
    if (results.rows[0]) {
      const nowConfirmed = 'true';
      const userId = results.rows[0].id;
      const userEmail = results.rows[0].email;
      const confirmUser = {
          text: 'UPDATE users SET is_confirmed = $1 WHERE id = $2 AND email = $3',
          values: [nowConfirmed, userId, userEmail]
      }
      pool.query(
        confirmUser,
        (err, results) => {
          if (results.rows[0]) {
            res.send({
              success: `User ${results.rows[0].firstname +
                ' ' +
                results.rows[0].lastname} has confirmed their email.`
            });
          } else if (err) {
            res.send({
              error: err
            });
          }
        }
      );
      res.send({
        success: `User ${results.rows[0].firstname +
          ' ' +
          results.rows[0].lastname} has confirmed their email.`
      });
    } else if (err) {
      res.send({
        error: err
      });
    }
  });
});

module.exports = router;
