import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';

const useHomeFetch = () => {
  // Estados que guardarán información sobre las películas, géneros, buscador y páginas.
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Hook useParams que se usará para obtener el id de la película seleccionada.
  let { movieGenre } = useParams();

  /**
   * Función fetchMoviesByGenre encargada de obtener las películas de la base de datos tmdb.
   * Las películas se guardarán en el estado setGenres.
   *
   * @param {*} endpoint
   */
  const fetchMoviesByGenre = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setGenres(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Hook useEffect que se ejecutará cada vez que elijamos un género de películas.
  useEffect(() => {
    const endpoint = `${API_URL}discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES&include_adult=false&page=${currentPage}&with_genres=${movieGenre}`;
    fetchMoviesByGenre(endpoint);
  }, [movieGenre]);

  /**
   * Función fetchMovies encargada de obtener las películas de la base de datos tmdb y
   * guardarlas en el estado setMovies.
   *
   * @param {*} endpoint
   */
  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(movies);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Función fetchSearch encargada de obtener las películas de la base de datos tmdb en función
   * de la búsqueda que hayamos introducido.
   * Se guardarán en el estado setMovies y en el estado setGenres.
   *
   * @param {*} endpoint
   */
  const fetchSearch = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setMovies(data.results);
      setGenres(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Hook useEffect que se ejecutará cada vez que introduzcamos una búsqueda.
   * Se encargará de obtener las películas de la base de datos tmdb en función de la búsqueda.
   */
  useEffect(() => {
    if (searchMovie) {
      const endpoint = `${API_URL}search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES&&include_adult=false&query=${searchMovie}&page${currentPage}`;
      fetchSearch(endpoint);
    } else {
      fetchMovies(
        `${API_URL}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES&page=${currentPage}`
      );
    }
  }, [searchMovie]);

  /**
   * Hook useEffect que se ejecutará cada vez que cambiemos de página.
   * Se encargará de obtener las películas de la base de datos tmdb en función de la página.
   */
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES&page=${currentPage}`;
    fetchMovies(endpoint);
  }, []);

  const post = () => {
    if (currentPage < 1000) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      loadMoreItems();
    }
  };

  useEffect(() => {
    post();
  }, [currentPage]);

  const prev = () => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      loadMoreItems();
    }
  };

  useEffect(() => {
    prev();
  }, [currentPage]);

  /**
   * Función loadMoreItems encargada de cambiar la página actual.
   * Se encargará de obtener las películas de la base de datos tmdb en función de la página.
   */
  const loadMoreItems = () => {
    let endpoint = '';
    if (movieGenre) {
      endpoint = `${API_URL}discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false&&with_genres=${movieGenre}&language=es-ES&page=${currentPage}`;
      fetchMoviesByGenre(endpoint);
    } else {
      endpoint = `${API_URL}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES&page=${currentPage}`;
      fetchMovies(endpoint);
    }
  };

  return { genres, movies, searchMovie, setSearchMovie, setCurrentPage, currentPage };
};

export default useHomeFetch;
