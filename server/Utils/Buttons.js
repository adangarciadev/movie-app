const express = require('express');
const router = express.Router();
const db = require('../Config/Database');

// Diferentes métodos http (GET y POST) que conectarán el lado del cliente con el servidor para realizar
// diferentes operaciones con los botones (favoritos, pendientes y votaciones), además de eliminar películas.
router
  .get('/favbutton/:id', (req, res) => {
    const userId = req.params.id;

    const sqlQuery = 'SELECT * FROM movie WHERE user_id= ? and isFav="" and isPending is null';

    db.query(sqlQuery, [userId], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  })
  .get('/watchbutton/:id', (req, res) => {
    const userId = req.params.id;
    const sqlQuery = 'SELECT * FROM movie WHERE user_id=? and isFav is null and isPending=""';

    db.query(sqlQuery, [userId], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  })
  .post('/movies/:resource', (req, res) => {
    const resource = req.params.resource;
    const userId = Number(req.body.userId);
    const movieId = Number(req.body.movieId);
    const title = req.body.title;
    const hasBeenWatched = '';
    const isFav = '';
    const isPending = '';
    const poster = req.body.poster;

    const sqlQuery = 'SELECT * FROM movie WHERE user_id=? and movie_id=?';
    const sqlExist = 'SELECT * FROM rating WHERE user_id=? and movie_id=?';

    if (resource === 'favoritas') {
      db.query(sqlQuery, [movieId, userId], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          const sqlQuery =
            'INSERT INTO movie (user_id, movie_id, title, hasBeenWatched, isFav, poster) VALUES (?,?,?,?,?,?)';
          db.query(sqlQuery, [userId, movieId, title, hasBeenWatched, isFav, poster], (err, result) => {
            // console.log(err);
            console.log(result);
          });
        }
      });
    } else {
      db.query(sqlExist, [userId, movieId], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else if (result.length > 0) {
          res.send({ message: 'No puedes poner en pendientes una película que ya has votado.' });
        } else {
          if (resource === 'watchlist') {
            db.query(sqlExist, [movieId, userId], (err, result) => {
              if (err) {
                res.send({ err: err });
              } else if (result.length > 0) {
                res.send({ message: 'No puedes poner en pendientes una película que has votado.' });
              } else {
                db.query(sqlQuery, [movieId, userId], (err, result) => {
                  if (err) {
                    res.send({ err: err });
                  } else {
                    const sqlQuery =
                      'INSERT INTO movie (user_id, movie_id, title, isPending, poster) VALUES (?,?,?,?,?)';
                    db.query(sqlQuery, [userId, movieId, title, isPending, poster], (err, result) => {
                      console.log(err);
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  })
  .post('/deletemovie', (req, res) => {
    const userId = Number(req.body.userId);
    const movieId = Number(req.body.movieId);

    const sqlDelete = 'DELETE FROM movie WHERE user_id=? and movie_id=?';

    db.query(sqlDelete, [userId, movieId], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  })
  .post('/rating', (req, res) => {
    const userId = Number(req.body.userId);
    const movieId = Number(req.body.movieId);
    const title = req.body.title;
    const ranking = Number(req.body.ranking);
    const poster = req.body.poster;

    const sql = 'INSERT INTO rating (user_id, movie_id, title, vote, poster) VALUES (?,?,?,?,?)';
    const sqlQuery = 'SELECT * FROM rating WHERE user_id=? and movie_id=? and vote is not null';
    const sqlUpdate = 'UPDATE rating SET vote=? WHERE user_id=? and movie_id=?';
    const sqlExist = 'SELECT * FROM movie WHERE user_id=? and movie_id=? and isPending=""';

    db.query(sqlExist, [userId, movieId], (err, result) => {
      if (result.length > 0) {
        res.send({ message: 'No puedes votar una película que tienes en pendientes.' });
        res.send(err);
      } else {
        db.query(sqlQuery, [userId, movieId], (err, result) => {
          if (result.length > 0) {
            db.query(sqlUpdate, [ranking, userId, movieId], (err, result) => {
              if (err) {
                res.send({ err: err });
              } else {
                res.send(result);
                // console.log(result);
              }
            });
          } else if (result.length < 1) {
            db.query(sql, [userId, movieId, title, ranking, poster], (err, result) => {
              if (err) {
                res.send({ err: err });
              } else {
                res.send(result);
                // console.log(result);
              }
            });
          }
        });
      }
    });
  })
  .get('/yourvote/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const sqlQuery = 'SELECT * FROM rating WHERE user_id=?';

    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  })
  .get('/movieisvoted/:id', (req, res) => {
    const userId = req.params.id;

    const sqlQuery = 'SELECT * FROM rating WHERE user_id=? and vote is not null';

    db.query(sqlQuery, [userId], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  });

module.exports = router;
