const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

router.get('/getTeams/:userid', function(req, res) {
  let userId = req.params.userid;
  connection.query(
    `SELECT id, user_id, name FROM teams WHERE user_id=${userId}`,
    function(error, results, fields) {
      if (error) {
        console.log(error);
        res.send('There was an error fetching the teams.');
      } else {
        res.send(results);
      }
    }
  );
});

router.get('/getUserData/:id', function(req, res) {
  let userId = req.params.id;
  connection.query(
    `SELECT id, firstname, lastname FROM users WHERE id=${userId}`,
    function(error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(results);
      }
    }
  );
});

module.exports = router;
