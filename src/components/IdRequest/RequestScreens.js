import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import * as firebase from 'firebase'
import * as ROUTES from '../../constants/routes';



import konnektlady from '../img/konnektlady.svg';
import checkcircle from '../img/check-circle.svg';
import logo from '../img/logo.svg';
import error from '../img/error.svg';



class RequestStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
  backToChat = () => {
    this.props.history.push({
      pathname: '/chatbox',
      state: { phone: this.props.location.state.phone }
    })
  }

  render() {
    console.log(this.props.location.state.name)
    return (
      <div className="facetoface-homepage">
        {this.props.location.state.status !== 200 ? <NonAudkent data={this.props.location.state.data} phone={this.props.location.state.phone} /> : <Audkent name={this.props.location.state.name} phone={this.props.location.state.phone} />}
      </div>
    )
  };
}

const Audkent = (props) => {
  console.log(props)
  return (
    <div className="status-screen-wrapper">
 
        <div className="container">
          <img className="logo" src={logo} />
        </div>
        <div className="container">
          <img src={checkcircle} />
          <h1>Auðkenni staðfest</h1>
          <p>Þjónustufulltrúi Arion banka hefur móttekið auðkennið þitt</p>
        </div>
        <div className="input-btn-container">
          <Link to={{ pathname: ROUTES.CHATBOX, state: { phone: props.phone, chatName: props.name } }} className="yes-btn">Áfram</Link>
        </div>
     
    </div>
  )
};

const NonAudkent = (props) => {
  console.log(props)
  return (
    <div className="status-screen-wrapper">
      <div className="status-screen">
          <img className="logo" src={logo} />
       
        <div className="container">
          <img src={error} />
          <p className="error-p">Auðkenning tókst ekki</p>
          <p className="error-p">{props.data.message}</p>
          <div className="input-btn-container">
            <Link to={{ pathname: ROUTES.CHATBOX, state: { phone: props.phone, chatName: props.name } }} className="yes-btn">Senda aftur</Link>
          </div>
        </div>
      </div>
    </div>
  );
}



export default RequestStatus;
