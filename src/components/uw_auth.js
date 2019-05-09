import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FirebaseContext } from './Firebase';
import logo from './img/logo.svg';
import konnektlady from './img/konnektlady.svg';

class uw_auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: null,
            userName: '',
            data: null,
            status: null,
            date: null,
            message: null,
            url_id: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({
            url_id: this.props.match.params.session,
            phone: this.props.match.params.phone,
            userName: this.props.match.params.username,
        });
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
                this.setState({ date: firebase.firestore.Timestamp.fromDate(new Date()) });
                this.setState({ status: response.status });
                return response.json();
            })
            .then(data => {
                if (data.responseStatus) {
                    this.setState({ message: data.responseStatus.message });
                    this.props.history.push({
                        pathname: '/status',
                        state: { status: this.state.status, data: data, phone: this.state.phone }
                    })
                }
                else {
                    const { ssn, name, phoneNumber, address, postalCode, city, token, } = data;
                    firebase.firestore().collection('end_users').doc(ssn).set({
                        name,
                        phoneNumber,
                        address,
                        postalCode,
                        city,
                        token,
                    });
                }
                this.setState({ data: data });
                firebase.firestore().collection('status').doc(this.state.url_id).set({
                    date: this.state.date,
                    status: this.state.status,
                    message: this.state.message,
                })
                this.props.history.push({
                    pathname: '/status',
                    state: { status: this.state.status, ssn: data.ssn }
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
                                    <div className="container">
                                        <img className="logo" src={logo} alt="Logo" />
                                        <h1>frá *nafn*</h1>
                                        <img className="konnekt-lady" src={konnektlady} />
                                    </div>
                                    <div className="container">
                                        <h2>Hæ {this.state.userName}</h2>
                                        <p>Þú hefur fengið beiðni um auðkenningu</p>
                                        <p>Viltu halda áfram?</p>
                                    </div>
                                    <div className="container">
                                        <button onClick={this._confirmphone} className="yes-btn">Auðkenna mig</button>
                                        <button className="no-btn">Hætta við</button>
                                    </div>
                                </div>
                            </div>)
                    }}</FirebaseContext.Consumer>
            </div>
        )
    };
}
export default uw_auth
