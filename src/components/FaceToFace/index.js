import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FirebaseContext } from '../Firebase';
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';
import searchperson from '../img/searchperson.svg';


class FaceToFace extends Component {
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
                const { ssn, name, phoneNumber, address, postalCode, city, token, } = data;
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
            <div className="facetoface-homepage">
                <FirebaseContext.Consumer>
                    {firebase => {
                        return (

                            <div className="facetoface-wrapper">
                                <div className="facetoface-container">
                                    <img className="logo" src={logo} alt="Logo" />
                                    <img className="searchperson" src={searchperson} alt="Logo" />
                                    <h2>Sendu Auðkenni með símanúmer viðkomandi</h2>
                                    <div class="input-btn-container">
                                        <label for="phone">Símanúmer</label>
                                        <input name="phone" type='text' placeholder='Símanúmer' value={this.state.phone} onChange={this._handleChange} />
                                        <button onClick={this._confirmphone} className="yes-btn">Senda</button>
                                    </div>
                                </div>




                            </div>



                        )
                    }}</FirebaseContext.Consumer>
            </div>
        )
    };
}

export default FaceToFace