import React, { Component } from 'react';

import * as firebase from 'firebase'
import logo from '../img/logo.svg';
import checkcircle from '../img/check-circle.svg';

import SVGIcon from "../img/SVGIcon";
import SignOutButton from '../SignOut';

class f2fstatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssn: null,
            date: null,
            status: '403',
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

                   
                </div>


                ;
        } else {
            statusScreen =
                // Screen that shows when authentication failed or connection timed out
                <div className="facetoface-homepage">
                    
                </div>;
        }
        if (this.props.location.state.status !== '200') {
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