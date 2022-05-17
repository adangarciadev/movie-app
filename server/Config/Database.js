const mysql = require('mysql2');

// Conexión a la base de datos
const db = mysql.createPool({
  connectionLimit: 10,
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'daw-project',
});

db.getConnection(function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Conectado!');
});

module.exports = db;
