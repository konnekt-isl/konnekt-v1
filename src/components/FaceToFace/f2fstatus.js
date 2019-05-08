import React, { Component } from 'react';

import * as firebase from 'firebase'
import logo from '../img/logo.svg';
import checkcircle from '../img/check-circle.svg';
import error from '../img/error.svg';
import SVGIcon from "../img/SVGIcon";
import SignOutButton from '../SignOut';

class f2fstatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssn: null,
            date: null,
            status: '200',
            timeStamp: null,
            statusStamp: null,
            sessionTimeOut: false,
            message: '',
            authUser: JSON.parse(localStorage.getItem('authUser')),
        }
    }

    componentDidMount() {
        firebase.firestore().collection('status').doc(this.props.location.state.ssn).get()
            .then((doc) => {
                this.setState({ ssn: doc.data().ssn })
                this.setState({ timeStamp: doc.data().date.seconds })
                this.setState({ status: doc.data().status })
                this.setState({ message: doc.data().message })
            })

        this.timerID = setInterval(
            this.tick,
            1000
        );

    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // tick = () => {
    //     const d = firebase.firestore.Timestamp.fromDate(new Date()).seconds - this.state.timeStamp
    //     console.log(d)
    //     if (d < 60) {
    //         this.setState({ sessionTimeOut: false })
    //     }
    //     else {
    //         this.setState({ sessionTimeOut: true })
    //     }
    // }

    render() {
        const userName = this.state.authUser.username
        const { sessionTimeOut } = this.state;
        let statusScreen;
        let statusMessage;
        if (!sessionTimeOut) {
            statusScreen =
                //Screen that shows when authentication is successfull
                <div className="facetoface-homepage">
                    <div className="facetoface-wrapper">

                    <div className="csr-header">
                        <div className="user-container">
                            <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                            <h1>{userName}</h1>
                        </div>
                        <SignOutButton className="signout-btn" />
                    </div>

                        <div className="facetoface-container">
                   
                                <img className="logo" src={logo} />
                                <img className="status-img" src={checkcircle} />
                                <h2>Auðkenning tókst</h2>
                                <p>Jón Jónsson hefur auðkennt sig</p>
                         
                           <div className="input-btn-container">
                                <button className="yes-btn">Auðkenna Næsta?</button>
                           </div>
                                
                         
                        </div>
                    </div>
                </div>
               
                ;
        } else {
            statusScreen =
                // Screen that shows when authentication failed or connection timed out
                <div className="facetoface-homepage">
                <div className="facetoface-wrapper">
                        <div className="csr-header">
                            <div className="user-container">
                                <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                            <h1>{userName}</h1>
                            </div>
                        <SignOutButton className="signout-btn" />
                        </div>
                   <div className="facetoface-container">
                        <img className="logo" src={logo} />  
                        <img className="status-img" src={error} />   
                        <h2>Auðkenning tókst ekki</h2>  
                        <div className="input-btn-container">
                            <button className="yes-btn">Senda aftur</button>
                        </div>
                   </div>
                </div>
            </div>;
        }
        if (this.state.status !== '200') {
            statusMessage = this.state.message
        }
        else {
            statusMessage = '';
        }
        return (
            <div>
                {statusScreen}
                {statusMessage}
            </div>
        );
    }
}

export default f2fstatus;