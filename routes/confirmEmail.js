const express = require('express');
const router = express.Router();
const pool = require('../pgConnect');

router.post('/', (req, res) => {
  console.log('route was hit');
  console.log(req.body.confirmstring);
  const confirmString = req.body.confirmstring;
  const query =
    'SELECT id, firstname, lastname, email FROM users WHERE confirm_string = ?';
  pool.query(query, [confirmString], (err, results, fields) => {
    if (results[0]) {
      const nowConfirmed = 'true';
      const userId = results[0].id;
      const userEmail = results[0].email;
      const confirmUser =
        'UPDATE users SET is_confirmed = ? WHERE id = ? AND email = ?';
      pool.query(
        confirmUser,
        [nowConfirmed, userId, userEmail],
        (err, results, fields) => {
          if (results[0]) {
            res.send({
              success: `User ${results[0].firstname +
                ' ' +
                results[0].lastname} has confirmed their email.`
            });
          } else if (err) {
            res.send({
              error: err
            });
          }
        }
      );
      res.send({
        success: `User ${results[0].firstname +
          ' ' +
          results[0].lastname} has confirmed their email.`
      });
    } else if (err) {
      res.send({
        error: err
      });
    }
  });
});

module.exports = router;
