import './Register.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Componente Register que muestra el formulario de registro.
const Register = () => {
  const { formData, handleChange, formErrors, handleSubmit, regStatus } = useAuth();

  return (
    <div className="register-bg">
      <div className="login-container">
        <form className="register" onSubmit={handleSubmit}>
          <div className="control">
            <p>{regStatus}</p>
            <label htmlFor="name">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              id="name"
              placeholder="Introduce tu usuario"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Introduce tu email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="control">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Contraseña (entre 6 y 12 caracteres)"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="control">
            <label htmlFor="password">Repite contraseña</label>
            <input
              type="password"
              name="passwordConfirm"
              id="password2"
              placeholder="Contraseña"
              onChange={handleChange}
              value={formData.passwordConfirm}
            />
          </div>
          <p>{formErrors.passwordConfirm}</p>
          <div className="control">
            <input type="submit" value="Registrarse" />
          </div>
        </form>
        <div className="link">
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
