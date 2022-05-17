const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Config/Database');
const router = express.Router();

// Diferentes métodos http (GET y POST) que conectarán el lado del cliente con el servidor para realizar el registro del usuario.
router.post('/', function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const sqlQuery = 'SELECT * FROM user WHERE username = ? AND email = ?';

  db.query(sqlQuery, [username, email], (err, result) => {
    if (err) {
      res.send({ error: err });
    }

    if (result.length > 0) {
      res.send({ message: 'El usuario y/o email ya existen' });
      console.log(res.send);
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        }

        const sqlQuery = 'INSERT INTO user (username, email, password) VALUES (?,?,?)';

        db.query(sqlQuery, [username, email, hash], (err, result) => {
          console.log(result);
        });
      });
    }
  });
});

module.exports = router;
