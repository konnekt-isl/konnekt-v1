import React, { Component } from 'react';

import * as firebase from 'firebase'
import { FirebaseContext } from './firebase';

class uw_status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            status: '200',
            timeStamp: null,
            statusStamp: null,
            sessionTimeOut: false,
            message: '',
        }
    }

    componentDidMount() {
        firebase.firestore().collection('status').doc(this.props.location.state.ssn).get()
            .then((doc) => {
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
            statusScreen = <div> green </div>;
        } else {
            statusScreen = <div> Session Time Out </div>;
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

export default uw_status;