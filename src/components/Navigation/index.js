import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import logo from '../img/logo.svg';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SVGIcon from "../img/SVGIcon";
import logoVertical from '../img/logovertical.svg';


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
          <NavigationNonAuth />
        )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

  <div className="navigation auth">
    <div className="sidebar">{/* Sidebar with vertical logo and icons */}
      <Link to={ROUTES.HOME}><img className="logo-vertical" src={logoVertical} alt="Logo" /></Link>
      {/* Container around the 3 icons */}
      <div className="icons-container">
        <div className="single-icon-container">
          <SVGIcon name="phone" width={24} />
        </div>
        <div className="single-icon-container">
          <Link to={ROUTES.CHATLIST}><SVGIcon name="message" width={24} /></Link>
        </div>
        <div className="single-icon-container">
          <Link to={ROUTES.FACETOFACE}><SVGIcon name="face" width={24} /></Link>
        </div>
      </div>
      <div className="single-icon-container">
        <Link to={ROUTES.ACCOUNT}><SVGIcon name="settings" width={24} /></Link>
        {/* <SignOutButton /> */}
      </div>
      {/* Sidebar ends */}</div>
    <ul>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
    </ul>
  </div>
);

const NavigationNonAuth = () => (
    <nav className="navigation non-auth sticky">
      <div className="logo-container">
        <Link to={ROUTES.LANDING}> <img src={logo} alt="Fara á forsíðu" /></Link>
      </div>
      <ul>
        <li className="navigation-link">
          <Link to={ROUTES.L_LAUSNIR}>Lausnir</Link>
        </li>
        {/* <li>
          <Link to={ROUTES.L_DEMO}>Demo</Link>
        </li> */ }
      {/* Commented out the demo link since it was removed from the design */}
      <li>
        <Link to={ROUTES.L_OKKARSYN}>Um okkur</Link>
      </li>
      <li>
        <Link to={ROUTES.L_SAMBAND}>Hafa samband</Link>
      </li>
      {/* <li>
          <Link to={ROUTES.CHAT}>Chat </Link> 
        </li>  (needs to move to the lower part)*/ }
      <li>
        <Link to={ROUTES.SIGN_IN}>Innskráning</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
