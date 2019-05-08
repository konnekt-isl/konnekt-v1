import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import SVGIcon from "../img/SVGIcon";


const CsrHeader = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ?
                    <div className="csr-header">
                        <div className="user-container">
                            <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                            <h1>{authUser.username}</h1>
                        </div>
                        <SignOutButton className="signout-btn" />
                    </div> : <div></div>}
        </AuthUserContext.Consumer>
    )
}

export default CsrHeader;
