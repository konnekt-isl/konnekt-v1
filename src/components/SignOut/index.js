import React from 'react';
import SVGIcon from "../img/SVGIcon";
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  
    <button className="signout-btn" type="button" onClick={firebase.doSignOut}>
      <SVGIcon name="logout" width={24} className="logout-icon" />
    </button>
  


);

export default withFirebase(SignOutButton);
