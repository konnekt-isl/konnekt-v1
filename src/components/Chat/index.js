import React, { Component } from 'react';
import * as firebase from 'firebase';
import konnektlady from '../img/konnektlady.svg';
class ChatStart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            chatName: '',
            message: '',
            messageDate: '',
        };
        this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    _handleChange = (event) => {
        this.setState({ messageDate: firebase.firestore.Timestamp.fromDate(new Date()) });
        if (event.target.name === 'name') {
            console.log("test name")
            this.setState({
                chatName: event.target.value
            })
        }
        else if (event.target.name === 'phone') {
            console.log("test phone")
            this.setState({
                phone: event.target.value
            })
        }
        else if (event.target.name === 'message') {
            console.log("test message")
            this.setState({
                message: event.target.value
            })
        }
    }

    onSubmit = event => {
        const { phone, chatName, message, messageDate } = this.state;
        firebase.firestore().collection('chat').doc(phone).set({
            read: false,
            messages: firebase.firestore.FieldValue.arrayUnion({
                chatName,
                message,
                messageDate,
            }),
        }, { merge: true })
        this.props.history.push({
            pathname: '/chatbox',
            state: { phone: this.state.phone, chatName: this.state.chatName }
        })

        event.preventDefault();
    };

    render() {
        const { name, phone, message, } = this.state;
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
                            placeholder="Username"
                        />
                        <label for="phone">Phone</label>
                        <input
                            name="phone"
                            value={phone}
                            onChange={this._handleChange}
                            type="text"
                            placeholder="Phone"
                        />
                        <label for="message">Question</label>
                        <input
                            name="message"
                            value={message}
                            onChange={this._handleChange}
                            type="text"
                            placeholder="What can i help you with?"
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