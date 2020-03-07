const pool = require('./db');

function getUsers() {
  const text = 'SELECT firstname FROM users';
  return pool.query(text);
}

function deleteUsers() {
  const text = 'DELETE FROM users';
  return pool.query(text);
}

module.exports.getUsers = getUsers;
module.exports.deleteUsers = deleteUsers;
