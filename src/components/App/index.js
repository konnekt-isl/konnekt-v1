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
import FaceToFace from '../FaceToFace';
import ChatStart from '../Chat';
import ChatBox from '../Chat/chatbox';
import ChatList from '../Chat/chatboxList';
import Status from '../FaceToFace/Screens'
import f2fstatus from '../FaceToFace/f2fstatus';
import Telephone from '../Telephone';


import uw_auth from '../uw_auth';
import uw_status from '../uw_status';
import sw_request from '../sw_request';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import '../../styles/css/styles.css';

const App = () => (
  <Router>
    <div className="body-wrapper">
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.CHAT} component={ChatStart} />
      <Route path={ROUTES.CHATBOX} component={ChatBox} />
      <Route path={ROUTES.CHATLIST} component={ChatList} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.AUTH} component={uw_auth} />
      <Route path={ROUTES.STATUS} component={uw_status} />
      <Route path={ROUTES.FACETOFACE} component={FaceToFace} />
      <Route path={ROUTES.F2FSTATUS} component={Status} />
      <Route path={ROUTES.TELEPHONE} component={Telephone} />

      <Route path={ROUTES.REQUEST} component={sw_request} />

    </div>
  </Router>
);

export default withAuthentication(App);
