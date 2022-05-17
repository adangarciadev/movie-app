const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Config/Database');
const router = express.Router();

// Diferentes métodos http (GET y POST) que conectarán el lado del cliente con el servidor para realizar el login del usuario.
router
  .get('/', (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  })
  .post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlQuery = 'SELECT * FROM user WHERE username = ?';

    db.query(sqlQuery, username, (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(result);
          } else {
            res.send({ message: 'El nombre de usuario y/o contraseña no existen' });
          }
        });
      } else {
        res.send({ message: 'El usuario no existe' });
      }
    });
  });

module.exports = router;
