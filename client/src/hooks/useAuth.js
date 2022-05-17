import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const useAuth = () => {
  /**
   * userData: objeto que contiene los datos del usuario.
   * Los siguientes estados (useState) guardarán diferentes datos (errores, usuario, contraseña, email, si el usuario está logeado o no, etc.).
   */
  const userData = { username: '', email: '', password: '', passwordConfirm: '' };
  const [formData, setFormData] = useState(userData);
  const [formErrors, setFormErrors] = useState({});
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [regStatus, setRegStatus] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [date1, setDate1] = useState();

  const navigate = useNavigate();

  // Indica si las solicitudes de control de acceso a sitios cruzados deben realizarse con credenciales o no.
  Axios.defaults.withCredentials = true;

  /**
   * Función login encargada de realizar el login del usuario.
   * En caso de que el usuario no exista o la contraseña sea incorrecta, se muestra un mensaje de error.
   * En caso de que el usuario exista y la contraseña sea correcta, se guarda el usuario en el estado de la aplicación
   * y se redirige a la página principal.
   */
  const login = async () => {
    await Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setRegStatus(response.data.message);
        console.log(response.data);
      } else if (!response.data.message) {
        navigate('/', { replace: true });
        window.location.reload();
      }
    });
  };

  /**
   * Hook useEffect que se ejecutará una vez el usuario esté loggeado correctamente.
   * Una vez esté conectado, se guarda el id del usuario, email, fecha y nombre de usuario
   * en los diferentes estados de la aplicación.
   */
  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn === true) {
        setUserId(response.data.user[0].user_id);
        setEmail(response.data.user[0].email);
        setDate(response.data.user[0].register_date);
        setLoginStatus(response.data.user[0].username);
        setIsLogged(true);
        if (date) {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          return setDate1(new Date(date).toLocaleDateString('es-ES', options));
        }
      }
    });
  }, [isLogged]);

  /**
   * Función logout encargada de realizar el logout del usuario.
   * Se guarda en el estado de la aplicación que el usuario no está logeado.
   * Se redirige a la página principal.
   */
  const logout = () => {
    Axios.get('http://localhost:3001/logout').then((response) => {
      setLoginStatus('');
      setIsLogged(false);
      setUserId('');
      navigate('/', { replace: true });
      window.location.reload();
    });
  };

  /**
   * Función handleChange encargada de guardar los datos de registeo del usuario en el estado setFormData.
   * según se vayan modificando.
   *
   * @param {*} event
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  /**
   * Función handleSubmit encargada de realizar el registro del usuario cuando pulsamos el botón de registrarse.
   * Se comprueba que los datos introducidos por el usuario son correctos y se almacenan en setFormErrors.
   * Si los datos son correctos, se realiza el registro del usuario.
   * Si los datos son incorrectos, se muestra un mensaje de error.
   * @param {*} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  }

  /**
   * Hook useEffect encargado de realizar el registro del usuario cuando pulsamos el botón de registrarse.
   * Se realiza una llamada a la API para registrar al usuario en la base de datos.
   * Si el usuario se registra correctamente, se llama al método register y se redirige a la página principal.
   */
  useEffect(() => {
    const register = async () => {
      await Axios.post('http://localhost:3001/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).then((response) => {
        if (response.data.message) {
          setRegStatus(response.data.message);
        }
      });
    };

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
      register();
      navigate('/', { replace: true });
    }
  }, [formErrors]);

  /**
   * Función validate encargada de validar los datos introducidos por el usuario cuando
   * pulsamos el botón de registrarse.
   * Se comprueba que los datos introducidos por el usuario son correctos y se almacenan en errors.
   * Si los datos son correctos, se devuelve un objeto vacío.
   * Si los datos son incorrectos, se devuelve un objeto con los errores.
   *
   * @param {*} values
   * @returns
   */
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = 'El nombre de usuario es obligatorio';
    }
    if (!values.email) {
      errors.email = 'El email es obligatorio';
    } else if (!regex.test(values.email)) {
      errors.email = 'El formato del email no es correcto';
    }
    if (!values.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener más de 6 caracteres';
    } else if (values.password.length > 12) {
      errors.password = 'La contraseña no debe tener más de 12 caracteres';
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Las contraseñas no coinciden';
    }
    return errors;
  };

  return {
    formData,
    handleChange,
    formErrors,
    isSubmit,
    handleSubmit,
    login,
    setUser,
    setPassword,
    loginStatus,
    isLogged,
    regStatus,
    userId,
    logout,
    email,
    date1,
  };
};
