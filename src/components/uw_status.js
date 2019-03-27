import React, { Component } from 'react';

import * as firebase from 'firebase'
import { FirebaseContext } from './firebase';

class uw_status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            status: {},
            timeStamp: null,
            statusStamp: null,
        }
    }

    componentDidMount() {
        firebase.database().ref('status/').on('value', (data) => {
            console.log(data.val()[this.props.location.state.ssn])
            this.setState({ timeStamp: data.val()[this.props.location.state.ssn].date.seconds })
        });

        this.timerID = setInterval(
            this.tick,
            1000
        );
    }

    tick = () => {
        const d = firebase.firestore.Timestamp.fromDate(new Date()).seconds - this.state.timeStamp
        console.log(d)
        if (d < 60) {
            this.setState({ status: { status: '200' } })
        }
        else {
            this.setState({ status: { status: '400' } })
        }
    }

    render() {
        const statusCode = this.state.status.status;
        let statusScreen;
        if (statusCode === '200') {
            statusScreen = <div> green </div>;
        } else {
            statusScreen = <div> red </div>;
        }

        return (
            <div>
                {statusScreen}
            </div>
        );
    }
}

export default uw_status;