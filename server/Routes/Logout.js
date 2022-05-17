const express = require('express');
const router = express.Router();

// Método http GET que conectará el lado del cliente con el servidor para realizar la desconexión del usuario.
router.get('/', (req, res) => {
  req.session.destroy();
  res.clearCookie('user');
  res.send({ message: 'Sesión cerrada' });
});

module.exports = router;
