// Endpoint URL para la API tmdb
const API_URL = 'https://api.themoviedb.org/3/';

// Endpoint para la API tmdb con las películas populares
const POPULAR = `${API_URL}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=es-ES`;

// Endpoint para la API tmdb con las imágenes del reparto de cada película
const CAST = 'http://image.tmdb.org/t/p/';

// Endpoint para la API tmdb con las imágenes de los posters de las películas
const IMAGE = 'http://image.tmdb.org/t/p/w342';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'http://image.tmdb.org/t/p/w500';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export { API_URL, POPULAR, IMAGE, BACKDROP_SIZE, POSTER_SIZE, CAST };
