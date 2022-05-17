import { IMAGE } from '../../config';
import NoImage from '../../images/no-image.png';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import useHomeFetch from '../../hooks/useHomeFetch';

// Componente MovieGenre que muestra la lista de películas por género.
const MovieGenre = () => {
  const { genres, searchMovie, setSearchMovie, setCurrentPage, currentPage } = useHomeFetch();
  console.log(searchMovie);

  return (
    <>
      <Header searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
      <div className="profile-bg">
        <div className="container profile">
          <div className="row g-3 justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
            {genres &&
              genres.map((movie) => (
                <div key={movie.index} className="col-12 col-md-6 col-lg-4">
                  <div className="image-container">
                    <Link to={'/movies/' + movie.id} style={{ textDecoration: 'none', color: 'black' }}>
                      <img
                        className="movie--poster"
                        src={movie.poster_path === null ? NoImage : IMAGE + movie.poster_path}
                        alt={movie.title}
                      />
                    </Link>
                    <h4 className="title">
                      <strong>{movie.title}</strong>
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            {currentPage === 1 ? null : (
              <li class="page-item">
                <button class="page-link" onClick={() => setCurrentPage((count) => count - 1)}>
                  Anterior
                </button>
              </li>
            )}
            <li class="page-item">
              <button class="page-link" onClick={() => setCurrentPage((count) => count + 1)}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MovieGenre;
