import React, { Component } from 'react';
import md5 from 'md5';
import { compose } from 'recompose';
import * as firebase from 'firebase'
import { withAuthorization, withEmailVerification } from '../Session';

import logo from '../img/logo.svg';

class Request extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            data: null,
            status: null,
            date: null,
            message: null,
            isLoading: false,
        };
    }

    onListenForStatus = (sessionID) => {
        this.setState({ isLoading: true })
        firebase.firestore().collection('status').doc(sessionID).set({
            sessionID,
            date: { seconds: null }
        })
            .then(() => {
                firebase.firestore().collection('status').doc(sessionID).onSnapshot((doc) => {
                    const { ssn, date, status, message } = doc.data();
                    this.setState({
                        ssn,
                        timeStamp: date.seconds,
                        status,
                        message,
                    })
                    if (ssn) {
                        this.getUserInfo(ssn);
                        this.setState({ isLoading: false })
                    }
                });
            })
    }

    getUserInfo = (ssn) => {
        firebase.firestore().collection('end_users').doc(ssn).get()
            .then((doc) => {
                this.setState({
                    userInfo: doc.data()
                })
                console.log(doc.data())
            })
    }

    _handleButtonClick = (event) => {
        const md5Date = md5(new Date())
        this.setState({
            url_id: md5Date,
        })
        this.props.authenticate(md5Date)
        this.onListenForStatus(md5Date);
    }

    render() {
        const phone = this.props.phone;
        const isInvalid = phone === '';

        return (
            <div>
                {this.state.isLoading ? <LoadingScreen /> :
                    <div className="konnekt-status-container" >
                        <img className="logo" src={logo} />
                        <div className="konnekt-section">
                            <p>Senda auðkenningsbeiðni til</p>
                            <h2>{this.props.username}</h2>
                            <button onClick={this._handleButtonClick} disabled={isInvalid} className="konnekt-btn" >Auðkenna með Konnekt</button>
                        </div>
                    </div>}
            </div>
        )
    }
}

const LoadingScreen = () => {
    return (
        < div className="konnekt-status-container" >
            <img className="logo" src={logo} />
            <div className="konnekt-section">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
            </div>
        </div >
    )
}

const AudkenniTokstEkki = () => {
    return (
        <div>
            <img className="logo" src={logo} />

            Tokst ekki
        </div>
    )
}

const AudkenniTokst = () => {
    return (
        <div>
            <img className="logo" src={logo} />
            Tokst
        </div>
    )
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(Request);