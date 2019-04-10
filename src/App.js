import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import firebase from './components/Firebase/firebase';

import uw_auth from './components/uw_auth';
import uw_status from './components/uw_status';


import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';

import * as ROUTES from './constants/routes';

import './styles/css/styles.css'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path="/authenticate" component={uw_auth} />
        <Route path="/authenticate/status" component={uw_status} />
      </div>
    );
  }
}

export default App;