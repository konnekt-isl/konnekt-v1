import React, { Component } from 'react';
import SignOutButton from '../SignOut';
import * as firebase from 'firebase'

import * as ROUTES from '../../constants/routes';
import SVGIcon from "../img/SVGIcon";
import checkcircle from '../img/check-circle.svg';
import logo from '../img/logo.svg';


class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssn: '',
      name: '',
      authUser: JSON.parse(localStorage.getItem('authUser')),
    }
  }

  componentDidMount() {
    firebase.firestore().collection('end_users').doc(this.props.location.state.ssn).get()
      .then((doc) => {
        console.log(doc)
      })
  }

  render() {
    console.log(this.props.location.state.ssn)
    return (
      <div className="facetoface-homepage">
        {this.props.location.state.status != '200' ? <NonAudkent /> : <Audkent />}
      </div>
    )
  };
}

class Audkent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const userName = 'Marcel'

    return (
      <div className="facetoface-wrapper">
        <div className="csr-header">
          {/* This could maybye be an component by it self. */}
          <div className="user-container">
            <SVGIcon className="avatar" name="avatar" width={30} height={30} />
            <h1>{userName}</h1>
          </div>
          <SignOutButton className="signout-btn" />
        </div>
        {/* end of compoment */}

        <div className="facetoface-container">

          <img className="logo" src={logo} />
          <img className="check-circle" src={checkcircle} />
          <h2>Auðkenning tókst</h2>
          <p>{this.state.name} hefur auðkennt sig</p>

          <div className="input-btn-container">
            <button class="yes-btn">Auðkenna Næsta?</button>
          </div>

        </div>
      </div>)
  }
};

class NonAudkent extends Component {
  render() {
    return (
      <div>RED</div>
    );
  }
}



export default Status;
