import React, { Component } from 'react';
import * as firebase from 'firebase';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';
import md5 from 'md5';
import { HashLink as Link } from 'react-router-hash-link';
import chatexpand from '../img/chatexpand.svg';
import SVGIcon from "../img/SVGIcon";
import SignOutButton from '../SignOut';
import logo from '../img/logo.svg';

import Request from '../sw_request'

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
            url_id: null,
        };

        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._loadChat = this._loadChat.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    componentDidMount() {
        firebase.firestore().collection('chat').onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
            var chatboxes = [];
            querySnapshot.docs.forEach(function (doc) {
                const data = doc.data()
                chatboxes.push({ id: doc.id, read: data.read, date: data.messages.pop().messageDate.seconds })
            });
            this.setState({ chatboxes })
            this.setState({ chatName: this.state.authUser.username })
        })
    }

    _loadChat = (phone) => {
        firebase.firestore().collection('chat').doc(phone).onSnapshot((doc) => {
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

    authenticate = (url_id) => {
        this.setState({
            url_id
        })
        console.log(url_id)
    }


    render() {
        const { message, } = this.state;
        const isInvalid = message === '';
        return (
            <div className="page-wrapper chathomepage">
                <div className="chathomepage-wrapper">
                    <div className="csr-header">
                        <div className="user-container">
                            <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                            <p>User name</p>
                            <SignOutButton />
                        </div>

                    </div>
                    <div className="chat-overview">
                        <div className="chat-el-container">
                            <div>
                                <h2>Virk Netspjöll</h2><img className="chat-expand" src={chatexpand} />
                            </div>
                            <div>
                                <ul>{this.state.chatboxes.sort((a, b) => b.date - a.date).map((chatbox) => <li><button className={chatbox.read ? 'read' : 'unread'} onClick={() => this._handleClick(chatbox.id)}>{chatbox.id}</button></li>)}</ul>
                            </div>
                        </div>

                        <div className="chat-el-container">
                            <div>
                                <h2>Öll Netspjöll</h2><img className="chat-expand" src={chatexpand} />
                            </div>
                        </div>

                        <div className="chat-el-container">
                            <div>
                                <h2>Þjónustuteymi</h2><img className="chat-expand" src={chatexpand} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="csr-middle-section ">
                            <div className="chatbubble-wrapper">
                                <div className="chat-bubble-user-container netspjall-skjar2">
                                    {this.state.messages.map((message) => <div class={message.chatName === this.state.chatName ? 'chat-bubble-csr' : 'chat-bubble-user'}>{message.chatName + ':' + message.message}</div>)}
                                </div>
                            </div>
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
                        </div>

                    </div>

                    <div className="user-info-konnekt-wrapper">

                        <div className="current-user-wrapper">
                            <div className="current-user-container">
                                <h2>Selected User name</h2>
                                <div className="user-info">
                                    <h3>Email</h3>
                                    <p>user email</p>
                                    <h3>Sími</h3>
                                    <p>{this.state.phone}</p>
                                    <h3>IP</h3>
                                    <p>User IP</p>
                                </div>
                                <div>{this.state.user_info}</div>
                            </div>
                        </div>

                        <div className="konnekt-status-wrapper">
                            <div className="konnekt-status-container">
                                <img className="logo" src={logo} />
                                <div className="konnekt-section">
                                    <p>Senda auðkenningsbeiðni til</p>
                                    <h2>Selected User name</h2>
                                    <Request phone={this.state.phone} authenticate={this.authenticate} />
                                </div>
                            </div>

                        </div>



                    </div>
                </div>
            </div>)
    };
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ChatList);
