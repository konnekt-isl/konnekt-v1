import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';

import config from './components/Firebase/firebase';
import * as firebase from 'firebase'
import { FirebaseContext } from './components/Firebase';
firebase.initializeApp(config);


ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
