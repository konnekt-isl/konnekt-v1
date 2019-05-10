import React, { Component } from 'react';
import * as firebase from 'firebase'
import { HashLink as Link } from 'react-router-hash-link';
import * as ROUTES from '../../constants/routes';
import CsrHeader from '../Navigation/csrHeader';

import checkcircle from '../img/check-circle.svg';
import logo from '../img/logo.svg';
import error from '../img/error.svg';


class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      authUser: JSON.parse(localStorage.getItem('authUser')),
    }
  }

  componentDidMount() {
    this.props.location.state.ssn
      ? firebase.firestore().collection('end_users').doc(this.props.location.state.ssn).get()
        .then((doc) => {
          this.setState({ name: doc.data().name })
        })
      : console.log(this.props.location.state.status, this.props.location.state.data)
  }

  render() {
    return (
      <div className="facetoface-homepage">
      <CsrHeader />
        {this.props.location.state.status !== '200' ? <NonAudkent data={this.props.location.state.data} userName={this.state.authUser.username} phone={this.props.location.state.phone} /> : <Audkent name={this.state.name} userName={this.state.authUser.username} />}
      </div>
    )
  };
}

const Audkent = (props) => {
  return (
    <div className="facetoface-wrapper">
      
      <div className="facetoface-container">

        <img className="logo" src={logo} />
        <img className="status-img" src={checkcircle} />
        <h2>Auðkenning tókst</h2>
        <p>{props.name} hefur auðkennt sig</p>

        <div className="input-btn-container">
          <button className="yes-btn">Auðkenna Næsta?</button>
        </div>
      </div>
    </div>
  )
};

const NonAudkent = (props) => {
  return (
    
    <div className="facetoface-wrapper">
      <div className="facetoface-container">
        <img className="logo" src={logo} />
        <img className="status-img" src={error} />
        <h2>Auðkenning tókst ekki</h2>
        <h2>{props.data.responseStatus.message}</h2>
        <div className="input-btn-container">
          <button className="yes-btn"><Link to={{ pathname: ROUTES.FACETOFACE, state: { phone: props.phone }, }} >Senda aftur</Link></button>
        </div>
      </div>
    </div>
  );
}



export default Status;
