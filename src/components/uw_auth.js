import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FirebaseContext } from './Firebase';
import logo from './img/logo.svg';
import konnektlady from './img/konnektlady.svg';

const mockResponse = {
    "ssn": "0307844489",
    "address": "Brúnastöðum 27",
    "city": "Reykjavík",
    "name": "Marcel Radix",
    "phoneNumber": "6470788",
    "postalCode": "112",
    "token": "cd1ae943b74749d099fa",
    "status": "200"
}


class uw_auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            data: null,
            status: null,
            date: null,
            message: null,
        };

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange = (event) => {
        this.setState({ phone: event.target.value })
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
                this.setState({ status: response.status });
                return response.json();
            })
            .then(data => {
                console.log(data)

                data.responseStatus ? this.setState({ message: data.responseStatus.message }) :
                    this.setState({ date: firebase.firestore.Timestamp.fromDate(new Date()) });
                const { ssn, name, phoneNumber, address, postalCode, city, token, } = mockResponse;
                firebase.firestore().collection('end_users').doc(ssn).set({
                    name,
                    phoneNumber,
                    address,
                    postalCode,
                    city,
                    token,
                });
                this.setState({ data: data });
                firebase.firestore().collection('status').doc(data.ssn).set({
                    date: this.state.date,
                    status: this.state.status,
                    message: this.state.message,
                })
                console.log("Test: " + this.state.data.ssn)
                this.props.history.push({
                    pathname: '/authenticate/status',
                    state: { ssn: this.state.data.ssn }
                })
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
                        return (
                            <div className="simi-skjar1">
                                <div className="wrapper">
                                    <div className="logo-container">
                                        <img className="logo" src={logo} alt="Logo" />
                                        <h1>Frá Arion Banka</h1>
                                    </div>
                                    <div className="lady-container">
                                        <img src={konnektlady} />
                                    </div>
                                </div>
                                <div className="wrapper">
                                    <div className="text-container">
                                        <h2>Hæ Jón</h2>
                                        <p>Þú hefur fengið beiðni um auðkenningu</p>
                                        <p>Viltu halda áfram?</p>
                                        <input type='text' placeholder='Simanummer' value={this.state.phone} onChange={this._handleChange} />
                                        <button onClick={this._confirmphone} className="yes-btn">Auðkenna mig</button>
                                    </div>
                                </div>
                                <div className="no-btn-container">
                                    <button className="no-btn">Hætta við</button>
                                </div>
                            </div>)
                    }}</FirebaseContext.Consumer>
            </div>
        )
    };
}
export default uw_auth
