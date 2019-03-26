import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import firebase from './components/firebase/firebase'

import uw_auth from './components/uw_auth'


import './App.css';


const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const City = () => (
  <div>
    <ul>
      <li>San Francisco</li>
      <li>Istanbul</li>
      <li>Tokyo</li>
    </ul>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/authenticate">Authenticate</Link></li>
          <li><Link to="/cities">Cities</Link></li>
        </ul>

        <Route path="/" component={Home} />
        <Route path="/authenticate" component={uw_auth} />
        <Route path="/cities" component={City} />
      </div>
    );
  }
}

export default App;