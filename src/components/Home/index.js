import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import * as firebase from 'firebase';
import Messages from '../Messages';
import SVGIcon from "../img/SVGIcon";
import chatexpand from '../img/chatexpand.svg';
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';
import SignOutButton from '../SignOut';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      read: true,
      phone: '',
      chatName: '',
      message: '',
      chatboxes: [],
      messages: [],
      authUser: JSON.parse(localStorage.getItem('authUser')),
      messageDate: '',
      user_info: '',
    };
  };

  componentDidMount() {
    firebase.firestore().collection('chat').onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
      console.log(querySnapshot)
      var chatboxes = [];
      querySnapshot.docs.forEach(function (doc) {
        const data = doc.data()
        chatboxes.push({ id: doc.id, read: data.read, date: data.messages.pop().messageDate.seconds })
      });
      console.log(chatboxes)
      this.setState({ chatboxes })
      this.setState({ chatName: this.state.authUser.username })
    })
  }

  render() {
    const numRows = this.state.chatboxes.length
    const userName = this.state.authUser.username
    return (
      < div className="page-wrapper chathomepage" >


        <div className="chathomepage-wrapper">

          <div className="csr-header">
            <div className="user-container">
              <div className="username-container">
                <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                <p>{userName}</p>
              </div>

              <div className="signout-comp">
                <SignOutButton className="signout-btn" />
              </div>

            </div>
          </div>

          <div className="chat-overview">

            <div className="chat-el-container">
              <div>
                <h2>Virk Netspjöll</h2><img className="chat-expand" src={chatexpand} />
              </div>
            </div>


            <div className="chat-el-container">
              <div>
                <h2>Öll Netspjöll</h2><img className="chat-expand" src={chatexpand} />
              </div>
            </div>

            <div className="chat-el-container">
              <div>
                <h2>Þjónustuteymi</h2><img className="chat-expand" src={chatexpand} />
              </div>
            </div>
          </div>

          <div className="csr-middle-section">
            <h1>Hæ Username</h1>
            <h2>Gaman að sjá þig!</h2>
            <p>Þú ert með <span>{numRows}</span> virk spjöll í gangi</p>
          </div>



          <div className="user-info-konnekt-wrapper">
            <div className="current-user-wrapper">
              <img className="logo" src={logo} />
            </div>

            <div className="konnekt-status-wrapper">
              <img className="konnekt-lady" src={konnektlady} />
            </div>

          </div>


        </div>
      </div >
    )
  }
};


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
