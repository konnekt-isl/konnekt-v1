import React, { Component } from 'react';

class uw_auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: null,
            data: null,
        };

        this._handleChange = this._handleChange.bind(this);
    }

    _handebuttonclick = () => {
        console.log(this.state.data)
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
                console.log(response)
                return response.json()
            })
            .then(data => this.setState({ data: data }))
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                <label>Telephone: </label>
                <input type="text" value={this.state.phone} onChange={this._handleChange} />
                <button onClick={this._confirmphone}>Konnekt</button>

                <button onClick={this._handebuttonclick}>Console Log</button>
            </div>
        );
    }
}

export default uw_auth;
