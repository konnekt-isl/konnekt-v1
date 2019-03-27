import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import firebase from './components/firebase/firebase'

import uw_auth from './components/uw_auth'
import uw_status from './components/uw_status'


import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/authenticate">Authenticate</Link></li>
        </ul>
        <Route exact path="/authenticate" component={uw_auth} />
        <Route path="/authenticate/status" component={uw_status} />
      </div>
    );
  }
}

export default App;