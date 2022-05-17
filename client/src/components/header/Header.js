import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import { deepPurple } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import cine from '../../images/multimedia.png';

/**
 *
 *  Componente Header que contiene la información del header
 *
 * @returns {JSX}
 *
 * @param {searchMovie} searchMovie
 * @param {setSearchMovie} setSearchMovie
 * @returns
 */
const Header = ({ searchMovie, setSearchMovie }) => {
  const { isLogged, loginStatus, logout } = useAuth();
  const [searchbar, setSearchbar] = useState(false);
  let { movieId } = useParams();
  let location = useLocation();

  const search = () => {
    if (
      location.pathname === '/login' ||
      location.pathname === '/register' ||
      location.pathname === '/profile' ||
      location.pathname === `/movies/${movieId}`
    ) {
      setSearchbar(true);
    } else {
      setSearchbar(false);
    }
  };

  useEffect(() => {
    search();
  }, [location.pathname]);

  return (
    <>
      <main>
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <img src={cine} alt="https://www.flaticon.com/free-icons/video-player" style={{ width: '35px', margin: '5px' }} />
            <Navbar.Brand>Your Seventh Art</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <NavDropdown title="Géneros" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/28">
                    Acción
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/12">
                    Aventuras
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/16">
                    Animación
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/35">
                    Comedia
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/80">
                    Crimen
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/99">
                    Documental
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/18">
                    Drama
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/10751">
                    Familia
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/14">
                    Fantasía
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/36">
                    Historia
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/27">
                    Terror
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/10402">
                    Música
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/9648">
                    Misterio
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/10749">
                    Romance
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="878">
                    Ciencia Ficcion
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/53">
                    Thriller
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/10752">
                    Guerra
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/10770">
                    TV Movie
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/37">
                    Western
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {!searchbar ? (
                <FormControl
                  type="text"
                  onChange={(e) => setSearchMovie(e.target.value)}
                  placeholder="Search your movie..."
                  className="me-2"
                  aria-label="Search"
                  value={searchMovie}
                />
              ) : null}

              {isLogged ? (
                <Nav>
                  <NavDropdown title={loginStatus} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Desconectar</NavDropdown.Item>
                  </NavDropdown>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Registrarse
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
