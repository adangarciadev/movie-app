import tmdblogo from '../../images/tmdblogo.png';
import './Footer.css';

/**
 * Componente Footer que contiene la información del footer.
 */
const Footer = () => {
  return (
    <div class="container footer">
      <footer class="py my-2">
        <div>
          <p class="text-center text-muted">&copy; 2022 Your Seventh Art by Adán García</p>
        </div>
        <div>
          <img class="img-responsive" src={tmdblogo} alt="The movie database" />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
