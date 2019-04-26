import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatName: 'Starfsmadur',
            chatboxes: [],
        };
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {
        firebase.firestore().collection('chat').onSnapshot((querySnapshot) => {
            console.log(querySnapshot)
            var chatboxes = [];
            querySnapshot.docs.forEach(function (doc) {
                console.log(doc.id)
                chatboxes.push(doc.id)
            });
            this.setState({ chatboxes })
        })
    }

    _handleClick(phone) {
        this.props.history.push({
            pathname: '/chatbox',
            state: { phone: phone, chatName: this.state.chatName }
        })
    }

    render() {
        console.log(this.state.chatboxes)

        return (
            <div>
                <h1>Chat</h1>
                <ul>{this.state.chatboxes.map((chatbox) => <li><button onClick={() => this._handleClick(chatbox)}>{chatbox}</button></li>)}</ul>
            </div >
        )
    };
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ChatList);
