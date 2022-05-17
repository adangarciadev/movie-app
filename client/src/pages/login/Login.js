import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

import './Login.css';

// Componente Login que muestra el formulario de login.
const Login = () => {
  const { login, setUser, setPassword, regStatus } = useAuth();

  return (
    <div className="login-bg">
      <div className="login-container">
        <form>
          <div className="control">
            <p>{regStatus}</p>
            <label htmlFor="name">Nombre de usuario</label>
            <input
              onChange={(e) => {
                setUser(e.target.value);
              }}
              type="text"
              name="name"
              id="name"
              placeholder="Usuario"
            />
          </div>
          <div className="control">
            <label htmlFor="password">Contraseña</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="control">
            <input onClick={login} type="button" value="Iniciar sesión" />
          </div>
        </form>
        <div className="link">
          <Link to="/register">Regístrate</Link>
        </div>
        <div className="link">
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
