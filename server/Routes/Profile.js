const express = require('express');
const router = express.Router();
const db = require('../Config/Database');

// Diferentes métodos http (GET y POST) que conectarán el lado del cliente con el servidor para
// mostrar las películas favoritas, votadas y pendientes por el usuario en su perfil.
router
  .get('/profile/:movies', (req, res) => {
    const movies = req.params.movies;

    const sqlFav = 'SELECT * FROM movie WHERE isFav=""';
    const sqlVote = 'SELECT * FROM rating';
    const sqlWatchlist = 'SELECT * FROM movie WHERE isPending=""';

    if (movies === 'favoritas') {
      db.query(sqlFav, (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
    } else if (movies === 'votadas') {
      db.query(sqlVote, (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
    } else if (movies === 'watchlist') {
      db.query(sqlWatchlist, (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
    }
  })
  .post('/deleteprofile', (req, res) => {
    const userId = Number(req.body.userId);

    const sqlDelete = 'DELETE FROM user WHERE user_id=?';

    db.query(sqlDelete, [userId], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  })
  .post('/deletemovie/:del', (req, res) => {
    const del = req.params.del;
    const userId = Number(req.body.userId);
    const movieId = Number(req.body.movieId);

    const sqlDelFav = 'DELETE FROM movie WHERE user_id=? and movie_id=?';
    const sqlDelVote = 'DELETE FROM rating WHERE user_id=? and movie_id=?';
    const sqlDelWatchlist = 'DELETE FROM movie WHERE user_id=? and movie_id=? and isPending=""';

    if (del === 'favoritas') {
      db.query(sqlDelFav, [userId, movieId], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
    } else if (del === 'votadas') {
      db.query(sqlDelVote, [userId, movieId], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
    } else if (del === 'watchlist') {
      db.query(sqlDelWatchlist, [userId, movieId], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
    }
  });

module.exports = router;
