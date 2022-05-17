import { API_URL, BACKDROP_SIZE } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

import Axios from 'axios';

export const useMovieInfo = () => {
  // Estados que guardarán información sobre los botones, películas, géneros, reparto, votos, etc.
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedWatchlist, setIsClickedWatchlist] = useState(false);
  const [resource, setResource] = useState([]);
  const [fav, setFav] = useState(false);
  const [watch, setWatch] = useState(false);
  const [movie, setMovie] = useState([]);
  const [genre, setGenre] = useState([]);
  const [cast, setCast] = useState([]);
  const [vote, setVote] = useState(false);
  const [ranking, setRanking] = useState();

  // Id del usuario que traemos del custom hook useAuth.
  const { userId } = useAuth();

  // Id de la película que traemos del hook useParams en función de la página donde estemos.
  let { movieId } = useParams();

  let navigate = useNavigate();

  // Indica si las solicitudes de control de acceso a sitios cruzados deben realizarse con credenciales o no.
  Axios.defaults.withCredentials = true;

  /**
   * Hook useEffect que se ejecutará una vez estemos en una página de película.
   * Se obtendrán los datos de la película.
   */
  useEffect(() => {
    let endpointMovieInfo = `${API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES&append_to_response=videos,credits`;
    fetchDetailsInfo(endpointMovieInfo);
  }, [movieId]);

  /**
   * Función fetchDetailsInfo encargada de obtener los datos de la película.
   * Los datos se guardarán en el estado setMovie, setGenre y setCast.
   * Si hay algún error se redirige a la página de inicio.
   *
   * @param {*} endpoint
   */
  const fetchDetailsInfo = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setMovie(data);
      setGenre(data.genres);
      setCast(data.credits.cast);
    } catch (error) {
      navigate('/');
    }
  };

  /**
   * Función movies que realizará una llamada al backend en función de la acción que se quiera realizar.
   * resource será el endpoint y podrá ser: favoritas o watchlist.
   *
   */
  const movies = async () => {
    await Axios.post(`http://localhost:3001/movies/${resource}`, {
      movieId: Number(movie.id),
      title: movie.title,
      userId: userId,
      poster: movie.poster_path,
    })
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Función handleRating encargada de realizar una llamada al backend para guardar un voto.
   * @param {*} e
   */
  const handleRating = (e) => {
    e.preventDefault();
    setRanking(e.target.votes.value);
  };

  // Hook useEffect que se ejecutará una vez se haya realizado una llamada al backend para guardar un voto.
  useEffect(() => {
    if (ranking) {
      rating();
    }
  }, [ranking]);

  // Función rating encargada de realizar una llamada al backend para guardar un voto.
  const rating = async () => {
    await Axios.post('http://localhost:3001/rating', {
      userId: userId,
      movieId: Number(movie.id),
      title: movie.title,
      ranking: Number(ranking),
      poster: movie.poster_path,
    }).then((response) => {
      console.log(response);
      setVote(true);
      setWatch(false);
      setIsClickedWatchlist(false);
    });
  };

  /**
   * Hook use useEffect que se ejecutará cada vez que el usuario haya hecho click en el botón de favoritas
   * o en el botón de watchlist. Esto permitirá que los botones "persistan" en el usuario aun saliendo de la aplicación.
   */
  useEffect(() => {
    if (isClicked === true && isClickedWatchlist === false) {
      setResource('favoritas');
      setFav(true);
      movies();
    } else if (isClicked === false) {
      setFav(false);
      deleteMovie();
    }

    if (isClickedWatchlist === true && isClicked === false) {
      setResource('watchlist');
      setWatch(true);
      movies();
    } else if (isClickedWatchlist === false) {
      setWatch(false);
      deleteMovie();
    }
  }, [resource, isClickedWatchlist, isClicked]);

  /**
   * Función deleteMovie encargada de realizar una llamada al backend para eliminar una película
   * de la lista de favoritas o watchlist.
   */
  const deleteMovie = async () => {
    await Axios.post('http://localhost:3001/deletemovie', {
      userId: Number(userId),
      movieId: Number(movie.id),
    }).then((response) => {
      if (response.data.message) {
        console.log(userId);
      }
    });
  };

  /**
   * - Hook useEffect que se ejecutará cada vez que el usuario haya hecho click en el botón de favoritas.
   * - Se realizará una llamada al backend mediante la función favButton para comprobar si la película está
   * en la lista de favoritas del usuario con la id pasada por parámetro.
   * - Esto permitirá que los botones "persistan" en el usuario aun saliendo de la aplicación.
   */
  useEffect(() => {
    const favButton = async (id) => {
      try {
        const { data } = await Axios.get(`http://localhost:3001/favbutton/${id}`);

        for (let e of data) {
          if (e.user_id === Number(userId)) {
            if (e.movie_id === parseInt(movieId)) {
              setIsClicked(true);
              setIsClickedWatchlist(false);
              setFav(true);
              setWatch(false);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    favButton(userId);
  }, [userId, parseInt(movieId)]);

  /**
   * - Hook useEffect que se ejecutará cada vez que el usuario haya hecho click en el botón de watchlist.
   * - Se realizará una llamada al backend mediante la función watchButton para comprobar si la película está
   * en la lista de pendientes del usuario con la id pasada por parámetro.
   * - Esto permitirá que los botones "persistan" en el usuario aun saliendo de la aplicación.
   */
  useEffect(() => {
    const watchButton = async (id) => {
      try {
        const { data } = await Axios.get(`http://localhost:3001/watchbutton/${id}`);
        for (let e of data) {
          if (e.user_id === Number(userId)) {
            if (e.movie_id === parseInt(movieId)) {
              setIsClicked(false);
              setIsClickedWatchlist(true);
              setFav(false);
              setWatch(true);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    watchButton(userId);
  }, [userId, parseInt(movieId)]);

  /**
   * Hook useEffect que se ejecutará cada vez que el usuario haya votado una película.
   * En dicho hook se ejecutará la función movieVoted con una llamada al backend para comprobar si el usuario
   * ha votado la película.
   */
  useEffect(() => {
    const movieVoted = async (id) => {
      try {
        const { data } = await Axios.get(`http://localhost:3001/movieisvoted/${id}`);
        for (let e of data) {
          if (e.user_id === Number(userId)) {
            if (e.movie_id === parseInt(movieId)) {
              setFav(true);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    movieVoted(userId);
  }, [userId, parseInt(movieId)]);

  const styling = {
    backgroundImage: `url(${BACKDROP_SIZE + movie.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no repeat',
    display: 'grid',
    gridTemplateColumns: '480px 1fr',
  };

  return {
    movie,
    genre,
    fav,
    watch,
    cast,
    styling,
    handleRating,
    isClicked,
    setIsClicked,
    isClickedWatchlist,
    setIsClickedWatchlist,
    ranking,
    vote,
  };
};
