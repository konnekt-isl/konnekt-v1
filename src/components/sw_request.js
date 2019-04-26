import React, { Component } from 'react';
import md5 from 'md5';

import { compose } from 'recompose';


import * as firebase from 'firebase'
import { AuthUserContext, withAuthorization, withEmailVerification } from './Session';

class sw_request extends Component {
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
        };

        this._handleButtonClick = this._handleButtonClick.bind(this);
        this.onListenForStatus = this.onListenForStatus.bind(this);
    }


    componentDidMount() {
        // this.onListenForStatus();
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
        console.log("Test")
        firebase.firestore().collection('end_users').doc(ssn).get()
            .then((doc) => {
                this.setState({
                    userInfo: doc.data()
                })
            })
    }

    _handleButtonClick = (event) => {
        const md5Date = md5(new Date())
        this.setState({ url_id: md5Date })
        this.onListenForStatus(md5Date);
    }


    render() {
        console.log(this.state.userInfo)
        let url_message = <div> Click to generate url</div>;
        if (this.state.url_id != null) {
            url_message = <div>http://localhost:3000/authenticate/{this.state.url_id} </div>;
        } else {
            url_message = <div> Click to generate url</div>;
        }
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        <button onClick={this._handleButtonClick} className="yes-btn">Senda audkenni</button>
                        {url_message}
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(sw_request);