import { Link } from 'react-router-dom';
import { IMAGE } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import favLogo from '../../images/like.jpg';
import voteLogo from '../../images/vote.jpg';
import lupaLogo from '../../images/lupa.jpg';
import { useProfile } from '../../hooks/useProfile';
import './Profile.css';

import NoImage from '../../images/no-image.png';

// Componente Profile que muestra el perfil del usuario.
const Profile = () => {
  const { borrar, resource, setResource, items } = useProfile();
  const { loginStatus, userId, email, date1 } = useAuth();

  const listNumber = items.filter((item) => item.user_id === userId).length;
  console.log(listNumber);

  return (
    <section className="profile-bg">
      <div className="container profile">
        <div className="row g-3 justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          <div className="col-12 col-md-6 col-lg-4 mt-4">
            <div className="card-up">
              <img src={favLogo} className="card-img-top" alt="Favoritas" />
              <div className="card-body">
                <h5 className="card-title">Favoritas</h5>
                {resource === 'favoritas' && (
                  <p className="card-text">
                    Tienes {listNumber} {listNumber === 1 ? 'película' : 'películas'} en favoritas.
                  </p>
                )}
                <button type="button" className="btn btn-info btn-sm" onClick={() => setResource('favoritas')}>
                  Favoritas
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-4">
            <div className="card-up">
              <img src={voteLogo} className="card-img-top" alt="Votos" />
              <div className="card-body">
                <h5 className="card-title">Votadas</h5>
                {resource === 'votadas' && (
                  <p className="card-text">
                    Has votado {listNumber} {listNumber === 1 ? 'película' : 'películas'}.
                  </p>
                )}
                <button type="button" className="btn btn-info btn-sm" onClick={() => setResource('votadas')}>
                  Votadas
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-4">
            <div className="card-up">
              <img src={lupaLogo} className="card-img-top" alt="Lupa" />
              <div className="card-body">
                <h5 className="card-title">Pendientes</h5>
                {resource === 'watchlist' && (
                  <p className="card-text">
                    Tienes {listNumber} {listNumber === 1 ? 'película' : 'películas'} en pendientes.
                  </p>
                )}
                <button type="button" className="btn btn-info btn-sm" onClick={() => setResource('watchlist')}>
                  Pendientes
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-4">
            <div className="card-up">
              <div className="card-body">
                <p className="card-text">
                  <i className="bi bi-person-circle"></i> <strong>Usuario: </strong>{' '}
                  <span style={{ color: 'white' }}>{loginStatus}</span>
                </p>
                <p className="card-text">
                  <i className="bi bi-calendar-day"></i> <strong>Fecha de registro: </strong>{' '}
                  <span style={{ color: 'white' }}>{date1}</span>
                </p>
                <p className="card-text">
                  <i className="bi bi-envelope-fill"></i> <strong>Email: </strong>{' '}
                  <span style={{ color: 'white' }}>{email}</span>
                </p>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => setResource('eliminar')}>
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
        {items
          .filter((item) => item.user_id === userId)
          .map((item) => (
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card text-info bg-black mb-3">
                <div className="card-header">
                  <Link to={'/movies/' + item.movie_id} style={{ textDecoration: 'none', color: 'black' }}>
                    <img
                      key={item.id}
                      className="movie-card"
                      src={item.poster === null ? NoImage : IMAGE + item.poster}
                      alt={item.title}
                      style={{ width: '200px' }}
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm delete-button"
                    onClick={() => {
                      borrar(item.movie_id);
                    }}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
                {resource === 'votadas' && <span className="card-note"> {item.vote}</span>}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Profile;
