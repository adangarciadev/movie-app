import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MovieInfo from './pages/movieInfo/MovieInfo';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MovieGenre from './pages/genres/MovieGenre';
import Profile from './pages/profile/Profile';
import useHomeFetch from './hooks/useHomeFetch';

// Componente App que muestra la navegación mediante React Router
function App() {
  const { isLogged } = useAuth();
  const { searchMovie, setSearchMovie } = useHomeFetch();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Header searchMovie={searchMovie} setSearchMovie={setSearchMovie} />}>
          <Route path="*" element={<Navigate to="/" />} />
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path=":movieGenre" element={<MovieGenre />} />
          <Route path="movies/:movieId" element={<MovieInfo />} />
          {isLogged && <Route path="profile" element={<Profile />} />}
          {isLogged && <Route path="/" />}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
