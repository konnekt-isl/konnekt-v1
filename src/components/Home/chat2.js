import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import SVGIcon from "../img/SVGIcon";
import logo from "../img/logo.svg";
import chatexpand from '../img/chatexpand.svg';
import { auth } from 'firebase';


const HomePage = () => (
  <div className="page-wrapper homepage">
    <div className="homepage-wrapper">
      <div className="csr-header">
        <div className="user-container">
          <SVGIcon className="avatar" name="avatar" width={30} height={30} />
          <p>UserName</p>
        </div>
      </div>

      <div className="chat-overview">
        <div className="container">
          <h2>Virk Netspjöll</h2><img className="chat-expand" src={chatexpand} />
        </div>
        <div className="chat-overview">
          <div className="container">
            <div>
              <h2>Virk Netspjöll</h2><img className="chat-expand" src={chatexpand} />
              <div className="active-chat-users">
                <div className="dot"></div><p>User/Customer name</p>
              </div>
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
            <h1>Chat drasl</h1>
          </div>

        </div>

        <div className="konnekt-status-overview">

          <div className="customer-api">
            <h2 className="customer-name">Customer name</h2>
            <p className="customer-info-title">Nafn</p>
            <p className="customer-info">info</p>
            <p className="customer-info-title">Email</p>
            <p className="customer-info">info</p>
            <p className="customer-info-title">Sími</p>
            <p className="customer-info">info</p>
            <p className="customer-info-title">IP</p>
            <p className="customer-info">info</p>
          </div>

          <div class="customer-konnekt-status">
            <img className="logo" src={logo} />
            <p>Senda auðkenningsbeiðni til</p>
            <h2 class="customer-name">Customer name</h2>

            <button class="btn">Auðkenna með KONNEKT</button>
          </div>

        </div>
        <div className="chat-input-wrapper">
          <input type="text" placeholder="Skrifaðu hér"></input>
          <SVGIcon className="plus" name="plus" width={16} height={16} />
          <SVGIcon className="reply" name="reply" width={18} height={16} />
          <button class="btn">Senda</button>
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
