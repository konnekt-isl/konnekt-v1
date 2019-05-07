import React, { Component } from 'react';

import * as firebase from 'firebase'
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';
import checkcircle from '../img/check-circle.svg';
// import SVGIcon from "./img/SVGIcon";


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
        }
    }

    componentDidMount() {
        console.log('Status')
        firebase.firestore().collection('status').doc(this.props.history.state).get()
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

    tick = () => {
        const d = firebase.firestore.Timestamp.fromDate(new Date()).seconds - this.state.timeStamp
        console.log(d)
        if (d < 60) {
            this.setState({ sessionTimeOut: false })
        }
        else {
            this.setState({ sessionTimeOut: true })
        }
    }

    render() {
        const { sessionTimeOut } = this.state;
        let statusScreen;
        let statusMessage;
        if (!sessionTimeOut) {
            statusScreen =
                // Screen that shows when authentication is successfull
                <div className="wrapper">
                    <div className="status-screen">
                        <div className="container">
                            <img className="logo" src={logo} />
                            <img src={konnektlady} />
                        </div>
                        <div className="container">
                            <img src={checkcircle} />
                            <h1>Auðkenni staðfest</h1>
                            <p>Þjónustufulltrúi Arion banka hefur móttekið auðkennið þitt</p>
                        </div>
                        <div className="container">
                            <button class="yes-btn">Áfram</button>
                        </div>
                    </div>
                </div>;
        } else {
            statusScreen =
                // Screen that shows when authentication failed or connection timed out     
                <div className="wrapper">
                    <div className="status-screen">
                        <div className="container">
                            <img className="logo" src={logo} />
                            <img src={konnektlady} />
                        </div>
                        <div className="container">
                            <p className="error-p">Auðkenning tókst ekki</p>
                            <p className="error-p">Viltu reyna aftur?</p>
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