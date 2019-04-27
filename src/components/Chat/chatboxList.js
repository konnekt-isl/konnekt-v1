import React, { Component } from 'react';
import * as firebase from 'firebase';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            read: true,
            phone: '',
            chatName: '',
            message: '',
            chatboxes: [],
            messages: [],
            authUser: JSON.parse(localStorage.getItem('authUser')),
            messageDate: '',
        };
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._loadChat = this._loadChat.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    _loadChat = (phone) => {
        firebase.firestore().collection('chat').doc(phone).onSnapshot((doc) => {
            console.log(doc.data().messages)
            this.setState({
                read: doc.data().read,
                messages: doc.data().messages,
            })
        })
    }

    _handleChange = (event) => {
        this.setState({ messageDate: firebase.firestore.Timestamp.fromDate(new Date()) });
        if (event.target.name === 'message') {
            this.setState({
                message: event.target.value
            })
        }
    }

    _handleClick(phone) {
        this.setState({ phone })
        firebase.firestore().collection('chat').doc(phone).update({
            read: true,
        })
        this._loadChat(phone);
    }

    onSubmit = event => {
        const { phone, message, messageDate, chatName } = this.state;
        firebase.firestore().collection('chat').doc(phone).update({
            read: false,
            messages: firebase.firestore.FieldValue.arrayUnion({
                chatName,
                message,
                messageDate,
            })
        })
        this.setState({ message: '', messageDate: '' })
        event.preventDefault();
    };



    render() {
        const { message, } = this.state;
        const isInvalid = message === '';
        return (
            <div>
                < h1 > Chat</h1 >
                <ul>{this.state.chatboxes.sort((a, b) => b.date - a.date).map((chatbox) => <li><button className={chatbox.read ? 'read' : 'unread'} onClick={() => this._handleClick(chatbox.id)}>{chatbox.id}</button></li>)}</ul>

                <p>{this.state.messages.map((message) => <div class={message.chatName === this.state.chatName ? 'right' : 'left'}>{message.chatName + ':' + message.message}</div>)}</p>
                {this.state.phone ? (<form onSubmit={this.onSubmit}>
                    <input
                        name="message"
                        value={message}
                        onChange={this._handleChange}
                        type="text"
                        placeholder="Skrifaðu hér..."
                    />
                    <button className="btn" disabled={isInvalid} type="submit">
                        Senda
                    </button>
                </form>) : (<div>Click on the chatbox to start chatting </div>)}
            </div>)
    };
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ChatList);
