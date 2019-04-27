import React from 'react';
// import { Link } from 'react-router-dom';

import { HashLink as Link } from 'react-router-hash-link';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


import logo from '../img/logo.svg';

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
  <ul>
    <li>
      <Link to={ROUTES.FACETOFACE}>Face To Face</Link>
    </li>
    <li>
      <Link to={ROUTES.CHATLIST}>Chat</Link>
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
);

const NavigationNonAuth = () => (
  <header>
    <nav>
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
      <Link to={ROUTES.CHAT}>Chat (needs to move to the lower part)</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
    </nav>
  </header>

);

export default Navigation;
