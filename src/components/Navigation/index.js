import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import logo from '../img/logo.svg';
import locker from '../img/locker.svg';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import SVGIcon from "../img/SVGIcon";
import logoVertical from '../img/logovertical.svg';
import { NavLink } from 'react-router-dom';


//Hérna er ath hvort notandi sé skráður inn eða ekki, ef hann er skráður inn birtir hann navigation auth en ef ekki birtir hann navigation non auth.
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (

  <div className="navigation auth">
    <div className="sidebar">{/* Sidebar with vertical logo and icons */}
      <NavLink to={ROUTES.CHATLIST}><img className="logo-vertical" src={logoVertical} alt="Logo" /></NavLink>
      {/* Container around the 3 icons */}
      <div className="icons-container">

        <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.TELEPHONE}>
          <SVGIcon className="nav-icon" name="phone" width={24} />
        </NavLink>

        <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.CHATLIST}>
          <SVGIcon className="nav-icon" name="message" width={24} />
        </NavLink>


        <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.FACETOFACE}>
          <SVGIcon className="nav-icon" name="face" width={24} />
        </NavLink>

      </div>

      <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.ACCOUNT}>
        <SVGIcon className="nav-icon" name="settings" width={24} />
      </NavLink>

      {/* Sidebar ends */}</div>
  </div>
);

const NavigationNonAuth = () => {
  return (
    <nav className="navigation non-auth sticky" >
      <div className="logo-container">
        <Link to={ROUTES.LANDING}> <img src={logo} alt="Fara á forsíðu" /></Link>
      </div>
      <ul className="nav-ul">
        <li className="navigation-link">
          <Link to={ROUTES.L_LAUSNIR}>Lausnir</Link>
        </li>
        <li className="navigation-link">
          <Link to={ROUTES.L_OKKARSYN}>Um okkur</Link>
        </li>
        <li className="navigation-link">
          <Link to={ROUTES.L_SAMBAND}>Hafa samband</Link>
        </li>
        <li className="navigation-link">
          <Link to={ROUTES.SIGN_IN}>Innskráning</Link>
        </li>
      </ul>
      <button className="nav-locker">
        <Link to={ROUTES.SIGN_IN}>
          <img src={locker} alt="Fara í innskráningu" />
        </Link>

      </button>
    </nav>
  )
};

export default Navigation;
