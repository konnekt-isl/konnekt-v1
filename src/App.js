import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import firebase from './components/firebase/firebase'

import uw_auth from './components/uw_auth'
import uw_status from './components/uw_status'


import './App.css';
import './styles/css/styles.css';

const Public = () => (
  <div> This is a public page </div>
);



const Private = () => (
  <div> This is a private page </div>
);

const Login = () => (
  <div> Login Page <button>login</button> </div>
);



const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
};



const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);


class App extends Component {
  render() {
    return (
      <div style={{ width: 1000, margin: '0 auto' }}>
        <ul>
          <li><Link to='/public'> Public </Link></li>
          <li><Link to='/private'> Private </Link></li>
        </ul>
        <Route path='/public' component={Public} />
        <SecretRoute path='/private' component={Private} />
        <Route exact path="/authenticate" component={uw_auth} />
        <Route path="/authenticate/status" component={uw_status} />
      </div>
    );
  }
}

export default App;