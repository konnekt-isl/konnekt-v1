import React from 'react';
import SVGIcon from "../img/SVGIcon";
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <div>
    <button type="button" onClick={firebase.doSignOut}>
      <SVGIcon name="logout" width={24} className="logout-icon" />
    </button>
  </div>


);

export default withFirebase(SignOutButton);
