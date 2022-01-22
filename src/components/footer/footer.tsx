import './footer.scss';
import { Link } from 'react-router-dom';
import footerLogo from '../../assets/imgs/footer-logo.svg';
const Footer = () => {
  return (
    <footer>
      <div id="footer-container">
        <img src={footerLogo} className="img-logo" alt="Rubios Coastal Grill" />
        <div id="main-menu">
          <ul>
            <li>
              <Link to="/">CAREERS</Link>
            </li>
            <li>
              <Link to="/">LOCATIONS</Link>
            </li>
            <li>
              <Link to="/">GIFT CARDS</Link>
            </li>
            <li>
              <Link to="/">FUNDRAISERS</Link>
            </li>
            <li>
              <Link to="/">PRESS & AWARDS</Link>
            </li>
            <li>
              <Link to="/">BLOG</Link>
            </li>
            <li>
              <Link to="/">Contact US</Link>
            </li>
          </ul>
        </div>
        <div style={{ display: 'None' }}>
          <div>
            <h3>Connect With Us</h3>
            <div></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
