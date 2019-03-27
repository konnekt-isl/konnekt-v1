import React, { Component } from 'react';

import * as firebase from 'firebase'
import { FirebaseContext } from './firebase';

const mockResponse = {
    "ssn": "0307844489",
    "address": "Brúnastöðum 27",
    "city": "Reykjavík",
    "name": "Marcel Radix",
    "phoneNumber": "6470788",
    "postalCode": "112",
    "token": "cd1ae943b74749d099fa"
}


class uw_auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            data: null,
            status: null,
            date: null
        };

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(event) {
        this.setState({ phone: event.target.value });
    }

    _confirmphone = () => {
        fetch('https://onboardingdev.taktikal.is:443/api/Auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "PhoneNumber": this.state.phone,
                "FlowKey": "9a5f40ca1b01"
            })
        })
            .then(response => {
                this.setState({ status: '200' });
                // this.setState({ status: response.status });
                this.setState({ date: firebase.firestore.Timestamp.fromDate(new Date()) });
                return response
            })
            .then(data => {
                const { ssn, name, phoneNumber, address, postalCode, city, token, } = mockResponse;
                firebase.database().ref('users/' + ssn).set({
                    name,
                    phoneNumber,
                    address,
                    postalCode,
                    city,
                    token,
                });
                this.setState({ data: mockResponse });
                firebase.database().ref('status/' + this.state.data.ssn).set({
                    date: this.state.date,
                    status: this.state.status
                });
                this.props.history.push('/authenticate/status')
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <FirebaseContext.Consumer>
                    {firebase => {
                        return <div>
                            <label>Telephone: </label>
                            <input type='text' placeholder='' value={this.state.phone} onChange={this._handleChange} />
                            <button onClick={this._confirmphone}>Konnekt</button>
                        </div>;
                    }}
                </FirebaseContext.Consumer>
            </div>
        );
    }
}

export default uw_auth;
