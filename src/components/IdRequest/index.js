import React, { Component } from 'react';
import md5 from 'md5';
import { compose } from 'recompose';
import * as firebase from 'firebase'
import { withAuthorization, withEmailVerification } from '../Session';
import logo from '../img/logo.svg';
import checkCircle from '../img/check-circle.svg';
import error from '../img/error.svg';

class Request extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssn: '',
            phone: '',
            data: null,
            status: null,
            date: null,
            message: null,
            isLoading: false,
        };
        this._handleButtonClick = this._handleButtonClick.bind(this);
        this.onListenForStatus = this.onListenForStatus.bind(this);
    }

    componentWillReceiveProps(rProps) {
        if (rProps.username !== this.props.username) {
            this.setState({ status: null })
        }
    }

    onListenForStatus = (sessionID) => {
        this.setState({ isLoading: true })
        firebase.firestore().collection('status').doc(sessionID).set({
            sessionID,
            date: { seconds: null }
        })
            .then(() => {
                firebase.firestore().collection('status').doc(sessionID).onSnapshot({ includeMetadataChanges: true }, (doc) => {
                    const { ssn, date, status, message } = doc.data();
                    console.log(doc.data())
                    this.setState({
                        ssn,
                        timeStamp: date.seconds,
                        status,
                        message,
                    })
                    if (this.state.ssn) {
                        this.getUserInfo(ssn);
                    }
                });
            })
    }

    getUserInfo = (ssn) => {
        console.log('This is happening...')
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
        this.props.authenticate(md5Date)
        this.onListenForStatus(md5Date);
    }

    render() {
        const phone = this.props.phone;
        const isInvalid = phone === '';


        if (this.state.status === 200) {
            if (this.state.isLoading) this.setState({ isLoading: false })
            return < AudkenniTokst />
        }
        else if (this.state.status && this.state.status !== 200) {
            if (this.state.isLoading) this.setState({ isLoading: false })
            return < AudkenniTokstEkki message={this.state.message} />;
        }
        else if (this.state.isLoading) {
            return <LoadingScreen />;
        }
        else
            return (
                < div className="konnekt-status-container" >
                    <img className="logo" src={logo} />
                    <div className="konnekt-section">
                        <p>Senda auðkenningsbeiðni til</p>
                        <h2>{this.props.username}</h2>
                        <button onClick={this._handleButtonClick} disabled={isInvalid} className="konnekt-btn" >Auðkenna með Konnekt</button>
                    </div>
                </div>
            )
    }
}

const LoadingScreen = () => {
    return (
        <div className="konnekt-status-container" >
            <img className="logo" src={logo} />
            <div className="konnekt-section">
                <div className="loading-container">
                    <div class="circle circle-1"></div>
                    <div class="circle circle-2"></div>
                    <div class="circle circle-3"></div>
                </div>
                <h2>Auðkenning í ferli</h2>
            </div>
        </div>

    )
}

const AudkenniTokstEkki = (props) => {
    return (
        < div className="konnekt-status-container" >
            <img className="logo" src={logo} />
            <img className="status-icon" src={error} />
            <h2>Auðkenning tókst ekki</h2>
            <h2>{props.message}</h2>
        </div >
    )
}

const AudkenniTokst = (props) => {
    return (
        <div className="konnekt-status-container">
            <img className="logo" src={logo} />
            <img className="status-icon" src={checkCircle} />
            <h2>Auðkenning tókst</h2>
            <h2>{props.name}</h2>
        </div>
    )
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(Request);