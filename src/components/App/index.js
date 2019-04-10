import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import uw_auth from '../uw_auth';
import uw_status from '../uw_status';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import '../../styles/css/styles.css';

const App = () => (
  <Router>
    <div className="page-wrapper">
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.AUTH} component={uw_auth} />
      <Route path={ROUTES.STATUS} component={uw_status} />
    </div>
  </Router>
);

export default withAuthentication(App);
