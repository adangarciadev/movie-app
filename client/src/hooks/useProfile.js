import { useAuth } from './useAuth';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

export const useProfile = () => {
  // Traemos userId y logout del hook useAuth.
  const { userId, logout } = useAuth();

  // Estados que guardarán información sobre los botones de películas favoritas, votadas y pendientes.
  const [resource, setResource] = useState([]);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  // Indica si las solicitudes de control de acceso a sitios cruzados deben realizarse con credenciales o no.
  Axios.defaults.withCredentials = true;

  /**
   * Función vote encargada de realizar una llamada al backend el id del usuario loggeado para
   * poder mostrar las películas votadas por él en su perfil.
   *
   * @param {*} id
   */
  const vote = async (id) => {
    await Axios.get(`http://localhost:3001/yourvote${id}`, {}).then((res) => {
      console.log(res);
    });
  };

  /**
   * Hook useEffect que se ejecutará si pulsamos en el botón de ver las películas votadas y llamará
   * a la función vote. Si hay alguna película votada, saldrá la lista.
   */
  useEffect(() => {
    vote(userId);
  }, [resource]);

  /**
   * Función borrar encargada de realizar una llamada al backend para borrar una película de la lista que
   * queramos. Se pasa por parámetro el id de la película y el id del usuario loggeado.
   * @param {*} id
   */
  const borrar = (id) => {
    Axios.post(`http://localhost:3001/deletemovie/${resource}`, {
      userId: Number(userId),
      movieId: Number(id),
    }).then((response) => {
      setItems(
        items.filter((val) => {
          return val.movie_id !== id;
        })
      );
    });
  };

  /**
   * Función cuenta encargada de realizar una llamada al backend para eliminar la cuenta del usuario loggeado.
   * Una vez borrada se redirige a la página de inicio.
   */
  const cuenta = () => {
    Axios.post(`http://localhost:3001/deleteprofile`, {
      userId: Number(userId),
    }).then((response) => {
      logout();
      navigate('/', { replace: true });
    });
  };

  // Hook useEffect que se ejecutará si pulsamos en el botón de eliminar cuenta en el perfil.
  useEffect(() => {
    if (resource === 'eliminar') {
      const confirm = window.confirm('Vas a eliminar la cuenta, ¿estás de acuerdo?');
      if (confirm === true) {
        cuenta();
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [resource]);

  /**
   * Hook useEffect que se ejecutará si pulsamos en el botón mostrar películas en el perfil (favoritas, votadas o pendientes).
   * Llamará a la función showMovies para mostrar las películas.
   */
  useEffect(() => {
    showMovies(resource);
  }, [resource]);

  /**
   * Función showMovies encargada de realizar una llamada al backend para mostrar las películas de un usuario.
   * @param {*} res
   */
  const showMovies = async (res) => {
    await Axios.get(`http://localhost:3001/profile/${res}`).then((data) => setItems(data.data));
  };

  return { borrar, resource, setResource, items };
};
