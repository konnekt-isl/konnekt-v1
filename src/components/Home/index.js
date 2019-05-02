import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import SVGIcon from "../img/SVGIcon";
import chatexpand from '../img/chatexpand.svg';
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';
import SignOutButton from '../SignOut';

const HomePage = () => (
  <div className="page-wrapper chathomepage">


    <div className="chathomepage-wrapper">

        <div className="csr-header">
          <div className="user-container">
          <div className="username-container">
          <SVGIcon className="avatar" name="avatar" width={30} height={30} />
            <p>User name</p>
          </div>
            
            <div className="signout-comp">
            <SignOutButton />
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
          <p>Þú ert með <span>X</span> virk spjöll í gangi</p>
        </div>
       
        

         <div className="user-info-konnekt-wrapper">
          <div className="current-user-wrapper">
            <img className="logo" src={logo}/>
          </div>

          <div className="konnekt-status-wrapper">
            <img className="konnekt-lady" src={konnektlady}/>
          </div>

         </div>


    </div>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
