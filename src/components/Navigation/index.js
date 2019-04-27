import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import logo from '../img/logo.svg';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


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
    <Link to={ROUTES.LANDING}><img className="logo" src={logo} /></Link>
    <ul>
      <li>
        <Link to={ROUTES.FACETOFACE}>Face To Face</Link>
      </li>
      <li>
        <Link to={ROUTES.CHATLIST}>Chat</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div >
);

const NavigationNonAuth = () => (
  <header>
    <nav className="navigation non-auth">
      <ul>
        <li>
          <Link to={ROUTES.LANDING}> <img src={logo} alt="Fara á forsíðu" /></Link>
        </li>
        <li>
          <Link to={ROUTES.L_LAUSNIR}>Lausnir</Link>
        </li>
        <li>
          <Link to={ROUTES.L_DEMO}>Demo</Link>
        </li>
        <li>
          <Link to={ROUTES.L_OKKARSYN}>Um okkur</Link>
        </li>
        <li>
          <Link to={ROUTES.L_SAMBAND}>Hafa samband</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
