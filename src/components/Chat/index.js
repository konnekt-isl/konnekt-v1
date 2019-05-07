import React, { Component } from 'react';
import * as firebase from 'firebase';
import konnektlady from '../img/konnektlady.svg';
class ChatStart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            phone: '',
            chatName: '',
            message: '',
            messageDate: '',
            ip: '',
        };
        this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        fetch('https://ipapi.co/json/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.setState({ ip: data.ip + ' (' + data.city + ')' })
            })
    }



    _handleChange = (event) => {
        this.setState({ messageDate: firebase.firestore.Timestamp.fromDate(new Date()) });
        if (event.target.name === 'name') {
            this.setState({
                chatName: event.target.value
            })
        }
        else if (event.target.name === 'phone') {
            this.setState({
                phone: event.target.value
            })
        }
        else if (event.target.name === 'email') {
            this.setState({
                email: event.target.value
            })
        }
    }

    onSubmit = event => {
        const { phone, chatName, messageDate, email, ip } = this.state;
        firebase.firestore().collection('chat').doc(phone).set({
            read: false,
            ip: ip,
            email: email,
            username: chatName,
            messages: firebase.firestore.FieldValue.arrayUnion({
                chatName: 'Þjónustufulltrúi',
                message: 'Þú ert nú tengd/ur netspjalli, hér getum við auðkennt þig.',
                messageDate,
                isStaff: true,
            }),
        }, { merge: true })
        this.props.history.push({
            pathname: '/chatbox',
            state: { phone: this.state.phone, chatName: this.state.chatName }
        })

        event.preventDefault();
    };

    render() {
        const { name, phone, email } = this.state;
        const isInvalid = phone === '' || name === '';

        return (
            <div className="chat-index-wrapper">
                <div className="img-container">
                    <img className="konnekt-lady" src={konnektlady} />
                </div>


                <form onSubmit={this.onSubmit}>
                    <h1>Netspjall</h1>
                    <fieldset>
                        <legend>Velkomin/n í netspjall KONNEKT</legend>

                        <label for="name">Notandi</label>
                        <input
                            name="name"
                            value={name}
                            onChange={this._handleChange}
                            type="text"
                            placeholder="Notendanafn"
                        />
                        <label for="phone">Sími</label>
                        <input
                            name="phone"
                            value={phone}
                            onChange={this._handleChange}
                            type="text"
                            placeholder="Sími"
                        />
                        <label for="email">E-mail</label>
                        <input
                            name="email"
                            value={email}
                            onChange={this._handleChange}
                            type="text"
                            placeholder="E-mail"
                        />
                    </fieldset>
                    <button className="btn" disabled={isInvalid} type="submit">
                        Innskráning
                    </button>
                </form>
            </div>
        )
    };

}

export default ChatStart;