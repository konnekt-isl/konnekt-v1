import React, { Component } from 'react';
import md5 from 'md5';

import { compose } from 'recompose';


import * as firebase from 'firebase'
import { AuthUserContext, withAuthorization, withEmailVerification } from './Session';

class Request extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url_id: null,
            now: null,
            loading: false,
            ssn: '',
            status: '',
            timeStamp: '',
            message: '',
            userInfo: {},
            url_message: ''
        };

        this._handleButtonClick = this._handleButtonClick.bind(this);
        this.onListenForStatus = this.onListenForStatus.bind(this);
    }

    onListenForStatus = (sessionID) => {
        firebase.firestore().collection('status').doc(sessionID).set({
            sessionID,
            date: { seconds: null }
        })
            .then(() => {
                firebase.firestore().collection('status').doc(sessionID).onSnapshot((doc) => {
                    const { ssn, date, status, message } = doc.data();
                    this.setState({
                        ssn: ssn,
                        timeStamp: date.seconds,
                        status: status,
                        message: message
                    })
                    if (ssn) {
                        this.getUserInfo(ssn);
                    }
                });
            });
    }

    getUserInfo = (ssn) => {
        firebase.firestore().collection('end_users').doc(ssn).get()
            .then((doc) => {
                this.setState({
                    userInfo: doc.data()
                })
            })
    }

    _handleButtonClick = (event) => {
        const md5Date = md5(new Date())
        this.setState({
            url_id: md5Date,
        })
        console.log(md5Date)
        this.props.authenticate(md5Date)
        this.onListenForStatus(md5Date);
    }


    render() {
        // let url_message = <div> Click to generate url</div>;
        // if (this.state.url_id != null) {
        //     this.setState({
        //         url_message: 'http://localhost:3000/authenticate/{this.state.url_id}?{this.props.phone}'
        //     });
        // } else {
        //     url_message = <div></div>;
        // }

        // let user_info = <div></div>;
        // if (this.state.userInfo != null) {
        //     user_info = <div>{this.state.userInfo.name}</div>;
        // } else {
        //     user_info = <div></div>;
        // }

        const phone = this.props.phone;
        const isInvalid = phone === '';
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        <button onClick={this._handleButtonClick} disabled={isInvalid} className="konnekt-btn">Auðkenna með Konnekt</button>
                    </div>
                )}
            </AuthUserContext.Consumer >
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(Request);