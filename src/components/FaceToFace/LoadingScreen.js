import React from 'react';

import SVGIcon from "../img/SVGIcon";
import SignOutButton from '../SignOut';
import logo from '../img/logo.svg';

const LoadingScreen = (props) => {
    return (

        <div className="facetoface-homepage">
            <div className="facetoface-wrapper">
                <div className="csr-header">
                    {/* This could be component */}
                    <div className="user-container">
                        <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                        <h1>{props.userName}</h1>
                    </div>
                    <SignOutButton className="signout-btn" />
                </div>
                {/* end of component */}

                <div className="facetoface-container">

                    <img className="logo" src={logo} />

                    <div class="loader-container">
                        <div class="circle circle-1"></div>
                        <div class="circle circle-2"></div>
                        <div class="circle circle-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoadingScreen;