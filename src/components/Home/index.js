import React from 'react';
import { compose } from 'recompose';
// import SideBar from '../sidebarNav';
// import SideBar from 'sidebar';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import SVGIcon from "../img/SVGIcon";
import logoVertical from '../img/logovertical.svg';
import chatexpand from '../img/chatexpand.svg';
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';

const HomePage = () => (
  <div className="page-wrapper homepage">


    <div className="homepage-wrapper">

        <div className="csr-header">
        <div className="user-container">
          <SVGIcon className="avatar" name="avatar" width={30} height={30} />
          <p>User name</p>
        </div>
                  
        </div>
        <div className="chat-overview">
                <div className="container">
                  <div>
                    <h2>Virk Netspjöll</h2><img className="chat-expand" src={chatexpand} />
                  </div>
                </div>

                
                  <div className="container">
                  <div>
                    <h2>Öll Netspjöll</h2><img className="chat-expand" src={chatexpand} />
                  </div>
                </div>
                
                <div className="container">
                  <div>
                    <h2>Þjónustuteymi</h2><img className="chat-expand" src={chatexpand} />
                  </div>
                </div>
        </div>

        <div>
        <div className="csr-middle-section">
          <h1>Hæ Username</h1>
          <p>Gaman að sjá þig!</p>
        </div>
       
        </div>

         <div className="konnekt-status-overview">
          <div>
            <img className="logo" src={logo}/>
          </div>

          <div>
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
