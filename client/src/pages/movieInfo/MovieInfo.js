import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imdb from '../../images/imdb.png';
import NoImage from '../../images/no-image.png';
import { BACKDROP_SIZE, IMAGE } from '../../config';
import { Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import { useMovieInfo } from '../../hooks/useMovieInfo';
import { useAuth } from '../../hooks/useAuth';
import './MovieInfo.css';

// Componente MovieInfo que muestra la información de una película.
const MovieInfo = () => {
  const {
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
  } = useMovieInfo();
  const { isLogged } = useAuth();

  console.log(movie);

  return (
    <div className="bo" style={styling}>
      <div className="container-info">
        <div className="poster">
          <img src={BACKDROP_SIZE + movie.poster_path} alt={movie.title} class="mx-auto d-none d-md-block"></img>
        </div>
        <div className="info">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-detail">
            <div className="set col">
              <label>Fecha de lanzamiento</label>
              <span>{movie.release_date}</span>
            </div>
            <div className="set">
              <label>Duración</label>
              <span>{movie.runtime} minutos</span>
            </div>
            <div className="set">
              <label>Género</label>
              <span>{genre.map((g) => `${g.name}`).join(' / ')}</span>
            </div>
            <div className="set">
              <span>
                {' '}
                <>
                  <img
                    src={imdb}
                    alt="Imdb"
                    onClick={() => window.open('https://www.imdb.com/title/' + movie.imdb_id)}
                    target="_blank"
                    style={{ cursor: 'pointer' }}
                  />
                </>
              </span>
            </div>
            <div className="set">
              <span>
                {' '}
                {isLogged && (
                  <div className="text-center">
                    {!watch ? (
                      <>
                        <label>¡A favoritos!</label>
                        <Button
                          type="button"
                          class="btn btn-primary"
                          variant="info"
                          onClick={() => setIsClicked((prev) => !prev)}
                        >
                          {isClicked ? <i class="bi bi-heart-fill"></i> : <i class="bi bi-heart"></i>}
                        </Button>
                      </>
                    ) : null}
                  </div>
                )}
              </span>
            </div>
            <div className="set">
              <span>
                {isLogged && !vote && (
                  <div className="text-center">
                    {!fav ? (
                      <>
                        <label>¡A la watchlist!</label>
                        <Button
                          type="button"
                          class="btn btn-primary"
                          variant="info"
                          onClick={() => setIsClickedWatchlist((prev) => !prev)}
                        >
                          {isClickedWatchlist ? (
                            <i class="bi bi-binoculars-fill"></i>
                          ) : (
                            <i class="bi bi-binoculars"></i>
                          )}
                        </Button>
                      </>
                    ) : null}
                  </div>
                )}
              </span>
            </div>

            {isLogged && (
              <>
                {!watch ? (
                  <form onSubmit={handleRating}>
                    <div>
                      <label for="movie-vote">¿Qué nota le das a la película?</label>
                      <input id="vote" type="number" name="votes" min="1" max="10" />
                      <span>
                        {' '}
                        <Button variant="info" type="submit" size="sm">
                          Vota
                        </Button>
                      </span>
                    </div>
                  </form>
                ) : null}
              </>
            )}
            <div className="set">
              <span>
                {!watch & isLogged ? (
                  <div className="text-center">
                    <label>Tu voto:</label>
                    <div className="vote">{ranking ? ranking : '-'}</div>
                  </div>
                ) : null}
              </span>
            </div>
          </div>
          <div className="header">Sinopsis</div>
          <div className="movie-description">{movie.overview}</div>
          <div className="header">Reparto</div>
          <Carousel width="80px" thumbWidth={120} showArrows={false} emulateTouch={true}>
            {cast.slice(0, 10).map((g) => (
              <>
                <img
                  key={g.index}
                  className="pro"
                  src={g.profile_path === null ? NoImage : IMAGE + g.profile_path}
                  alt={g.name}
                />
                <figcaption>{g.name}</figcaption>
              </>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
