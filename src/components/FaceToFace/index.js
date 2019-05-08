import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FirebaseContext } from '../Firebase';
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';
import searchperson from '../img/searchperson.svg';
import SVGIcon from "../img/SVGIcon";
import SignOutButton from '../SignOut';
import LoadingScreen from '../FaceToFace/LoadingScreen'


class FaceToFace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            data: null,
            status: null,
            date: null,
            message: null,
            authUser: JSON.parse(localStorage.getItem('authUser')),
            isLoading: false,
        };

        this._handleChange = this._handleChange.bind(this);
    }

    componentDidMount() {
        // here the re-authenticate is running 
        if (this.props.location.state && this.props.location.state.phone) {
            this.setState({ phone: this.props.location.state.phone }, this._confirmphone)
        }

    }

    _handleChange = (event) => {
        this.setState({ phone: event.target.value })
    }

    _confirmphone = () => {
        this.setState({ isLoading: true })
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
                data.responseStatus ? this.props.history.push({
                    pathname: '/fstatus',
                    state: { status: this.state.status, data: data, phone: this.state.phone }
                }) :
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
                console.log("Test: " + this.state.phone)
                this.props.history.push({
                    pathname: '/fstatus',
                    state: { status: this.state.status, ssn: data.ssn }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const userName = this.state.authUser.username
        return (
            // Checking if the loading page shuld be shown
            this.state.isLoading
                ? <LoadingScreen /> //true
                : <div className="facetoface-homepage"> {/*false*/}
                    <FirebaseContext.Consumer>
                        {firebase => {
                            return (
                                <div className="facetoface-wrapper">
                                    <div className="csr-header">
                                        <div className="user-container">
                                            <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                                            <h1>{userName}</h1>
                                        </div>
                                        <SignOutButton className="signout-btn" />
                                    </div>
                                    <div className="facetoface-container">
                                        <img className="logo" src={logo} alt="Logo" />
                                        <img className="searchperson" src={searchperson} alt="" />
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