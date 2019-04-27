import React from 'react';
import { compose } from 'recompose';
// import SideBar from '../sidebarNav';
// import SideBar from 'sidebar';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import SVGIcon from "../img/SVGIcon";
import logoVertical from '../img/logovertical.svg';
import chatexpand from '../img/chatexpand.svg';

const HomePage = () => (
  <div className="page-wrapper homepage">
   {/* Sidebar with vertical logo and icons */}
   <div className="sidebar">
          <img className="logo-vertical" src={logoVertical} alt="Logo" />
            {/* Container around the 3 icons */}
              <div className="icons-container">
                  <div className="single-icon-container">
                  <SVGIcon name="phone" width={24}/>
                  </div>
                  <div className="active single-icon-container">
                  <SVGIcon name="message" width={24} className="message-icon" />
                  </div>
                  <div className="single-icon-container">
                  <SVGIcon name="face" width={24} />
                  </div>
              </div>
              <div className="single-icon-container">
                <SVGIcon name="settings" width={24} />
              </div>
              </div>{/* Sidebar ends */}


    <div className="homepage-wrapper">

        <div className="csr-header">
        <div className="user-container">
          <SVGIcon className="avatar" name="avatar" width={30} height={30} />
          <p>User name</p>
        </div>
                  
        </div>
        <div className="chat-overview">
                <div className="container">
                  <h2>Virk Netspjöll</h2><img className="chat-expand" src={chatexpand} />
                </div>
                <div className="container">
                  <h2>Öll Netspjöll</h2><img className="chat-expand" src={chatexpand} />
                </div>
                <div className="container">
                  <h2>Þjónustuteymi</h2><img className="chat-expand" src={chatexpand} />
                </div>
        </div>
        <div>
          <h1>Home Page</h1>
          <p>The Home Page is accessible by every signed in user.</p>
          <Messages />
        </div>
         <div className="konnekt-status-overview">
          
         </div>


    </div>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
