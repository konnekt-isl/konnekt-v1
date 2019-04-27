import React, { Component } from 'react';
import * as firebase from 'firebase';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatName: '',
            chatboxes: [],
            authUser: JSON.parse(localStorage.getItem('authUser')),
        };
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {
        firebase.firestore().collection('chat').onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
            console.log(querySnapshot)
            var chatboxes = [];
            querySnapshot.docs.forEach(function (doc) {
                const data = doc.data()
                chatboxes.push({ id: doc.id, read: data.read, date: data.messages.pop().messageDate.seconds })
            });
            console.log(chatboxes)
            this.setState({ chatboxes })
            this.setState({ chatName: this.state.authUser.username })
        })
    }

    _handleClick(phone) {
        this.props.history.push({
            pathname: '/chatbox',
            state: { phone: phone, chatName: this.state.chatName }
        })
        firebase.firestore().collection('chat').doc(phone).update({
            read: true,
        })
    }

    render() {
        return (
            <div>
                {this.state.authUser ? (<div>
                    < h1 > Chat</h1 >
                    <ul>{this.state.chatboxes.sort((a, b) => b.date - a.date).map((chatbox) => <li><button className={chatbox.read ? 'read' : 'unread'} onClick={() => this._handleClick(chatbox.id)}>{chatbox.id}</button></li>)}</ul>
                </div>) : (null)}
            </div>)

    };
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ChatList);
