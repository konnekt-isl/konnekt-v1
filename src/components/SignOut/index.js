import React from 'react';
import SVGIcon from "../img/SVGIcon";
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <div>
  <button type="button" onClick={firebase.doSignOut}>
  Signout
  </button>
  <SVGIcon name="logout" width={24} className="logout-icon"/>
  </div>

 
);

export default withFirebase(SignOutButton);
