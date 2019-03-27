import React, { Component } from 'react';

import * as firebase from 'firebase'
import { FirebaseContext } from './firebase';


class uw_auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            data: null,
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
                console.log(response.status)
                return response.json()
            })
            .then(data => {
                const { ssn, name, phoneNumber, address, postalCode, city, token } = data
                firebase.database().ref('users/' + ssn).set({
                    name,
                    phoneNumber,
                    address,
                    postalCode,
                    city,
                    token,
                });
                this.setState({ data: data })
            })
            .catch(err => {
                console.log(err)
            });
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
