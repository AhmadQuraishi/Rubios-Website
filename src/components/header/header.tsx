import './header.scss';

import { Link } from 'react-router-dom';

import logo from '../../assets/imgs/logo.svg';
import menuicon from '../../assets/imgs/menu-icon.svg';
import cart from '../../assets/imgs/cart-icon.svg';

const Header = () => {
  return (
    <header>
      <div id="header-container">
        <img src={logo} id="logo" alt="Rubios Coastal Grill" />
        <div id="content-panel">
          <div className="content">
            <p className="menu-text">
              <Link to="/">Main Menu</Link>
            </p>
            <p className="cart-icon">
              <img src={cart} alt="Cart Icon" />
            </p>
          </div>
          <div className="menu-icon">
            <img src={menuicon} alt="Menu Icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
