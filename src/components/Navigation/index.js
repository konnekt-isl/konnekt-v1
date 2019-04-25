import React from 'react';
import { Link } from 'react-router-dom';
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
  </div>
);

const NavigationNonAuth = () => (
  <div className="navigation non-auth">
  <Link to={ROUTES.LANDING}><img className="logo" src={logo} /></Link>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Innskráning</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
