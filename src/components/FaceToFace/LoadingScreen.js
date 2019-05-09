import React from 'react';

import CsrHeader from '../Navigation/csrHeader'

import logo from '../img/logo.svg';

const LoadingScreen = (props) => {
    return (

        <div className="facetoface-homepage">
            <div className="facetoface-wrapper">
                <CsrHeader />
                <div className="facetoface-container">

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