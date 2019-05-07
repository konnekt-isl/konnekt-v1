import React, { Component } from 'react';
import * as firebase from 'firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';
import chatexpand from '../img/chatexpand.svg';
import SVGIcon from "../img/SVGIcon";
import SignOutButton from '../SignOut';
import logo from '../img/logo.svg';
import konnektlady from '../img/konnektlady.svg';
import paperclip from '../img/paperclip.svg';
import Request from '../sw_request'


// Þetta er chat fyrir þjónustuaðila
class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            read: true,
            phone: '',
            chatName: '',
            isStaff: false,
            message: '',
            chatboxes: [],
            messages: [],
            authUser: JSON.parse(localStorage.getItem('authUser')),
            messageDate: '',
            url_id: null,
            contentIsVisible: false,
            messageList: {},
        };

        this.messageList = React.createRef();

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
                chatboxes.push({ id: doc.id, read: data.read, username: data.username, email: data.email, date: data.messages.pop().messageDate.seconds })
            });
            console.log(chatboxes)
            this.setState({ chatboxes })
            this.setState({
                chatName: this.state.authUser.username,
                isStaff: true
            })
        })
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    _loadChat = (phone) => {
        firebase.firestore().collection('chat').doc(phone).onSnapshot((doc) => {
            this.setState({
                read: doc.data().read,
                messages: doc.data().messages,
                username: doc.data().username,
                email: doc.data().email,
                ip: doc.data().ip
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
        const { phone, message, messageDate, chatName, isStaff } = this.state;
        firebase.firestore().collection('chat').doc(phone).update({
            read: false,
            messages: firebase.firestore.FieldValue.arrayUnion({
                chatName,
                isStaff,
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

        const url = 'http://localhost:3000/authenticate/' + url_id + '/' + this.state.phone + '/' + this.state.username
        const { phone, chatName } = this.state;
        firebase.firestore().collection('chat').doc(phone).update({
            read: false,
            messages: firebase.firestore.FieldValue.arrayUnion({
                chatName,
                url,
                message: '',
                messageDate: firebase.firestore.Timestamp.fromDate(new Date()),
            })
        })
    }

    expand = () => {
        this.setState({ contentIsVisible: true })
    }
    // To let the chat scroll down automaticly.
    scrollToBottom = () => {
        const messageList = document.getElementById('messageList') || {}
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {
        const numRows = this.state.chatboxes.length
        const userName = this.state.authUser.username
        const { message, } = this.state;
        const isInvalid = message === '';

        let MyCollapse = "content";
        if (this.state.contentIsVisible) { MyCollapse = "content active" }
        else {
            MyCollapse = "content"
        }

        return (<div className="page-wrapper chathomepage">
            <div className="chathomepage-wrapper">

                {/* Header fyrir notenda avatar og signout takka */}
                <div className="csr-header">
                    <div className="user-container">
                        <SVGIcon className="avatar" name="avatar" width={30} height={30} />
                        <h1>{userName}</h1>
                    </div>
                    <SignOutButton className="signout-btn" />
                </div>


                {/* Vinstri dálkur (Virk spjöll, öll spjöll og þjónustuteymi) */}
                <div className="chat-overview">
                    <div className="chat-el-container">
                        <div className="chat-el-div">
                            <h2>Virk Netspjöll</h2>
                            <img onClick={this.expand} className="chat-expand" src={chatexpand} />
                        </div>
                        <ul className={MyCollapse}>{this.state.chatboxes.sort((a, b) => b.date - a.date).map((chatbox) => <li className={chatbox.read ? 'read' : 'unread'} onClick={() => this._handleClick(chatbox.id)}>{chatbox.id}</li>)}</ul>
                    </div>

                    <div className="chat-el-container">
                       <div className="chat-el-div">
                            <h2>Öll Netspjöll</h2>
                            <img className="chat-expand" src={chatexpand} />
                        </div>
                    </div>

                    <div className="chat-el-container">
                        <div className="chat-el-div">
                            <h2>Þjónustuteymi</h2>
                            <img className="chat-expand" src={chatexpand} />
                        </div>
                    </div>
                </div>

                {/* Miðju dálkur sem sýnir chat history*/}
                <div className="csr-middle-section ">
                    {
                        this.state.phone === '' ?
                            (
                                <div className="welcome-msg">
                                    <h1>Hæ {userName}</h1>
                                    <h2>Gaman að sjá þig!</h2>
                                    <p>Þú ert með <span>{numRows}</span> virk spjöll í gangi</p>
                                </div>
                            )
                            :
                            (
                                <div className="chat-display-and-input-wrapper">
                                    <div className="chat-display-wrapper" id='messageList'>

                                        {this.state.messages.map((message) => <div className="chat-bubble-container">
                                            <div className={message.isStaff ? 'chat-bubble csr' : 'chat-bubble user'}>
                                                <p className="msg">{message.url ? 'Auðkennisbeðni hefur verið send.' : message.chatName + ' : ' + message.message}</p>
                                            </div>
                                            <div>
                                                <p className={message.isStaff ? 'msg-timestamp' : 'msg-timestap'}> {new Date(parseInt(message.messageDate.seconds * 1000)).toUTCString()}</p>
                                            </div>
                                        </div>)}


                                    </div>
                                    {this.scrollToBottom()}

                                    {/* Chat input neðst á miðju síðunnar (þarsem þjónustuaðili skrifar inn í) */}
                                    <div className="chat-input-wrapper">
                                        {this.state.phone ? (<form className="chat-input-form" onSubmit={this.onSubmit}>
                                            <input
                                                name="message"
                                                value={message}
                                                onChange={this._handleChange}
                                                type="text"
                                                placeholder="Skrifaðu hér..."
                                            />

                                        </form>) : (<div>Click on the chatbox to start chatting </div>)}
                                        <div className="chat-options">
                                            <img className="paperclip" src={paperclip} />
                                            <SVGIcon className="plus" name="plus" width={30} height={30} />
                                            <button className="btn" disabled={isInvalid} type="submit">
                                                Senda
                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                    }

                </div>


                {
                    this.state.phone === '' ? (
                        //Viðmót ÁÐUR en er smellt á símanúmer
                        <div className="user-info-konnekt-wrapper">

                            <div className="current-user-wrapper">
                                <img className="logo" src={logo} />
                            </div>

                            <div className="konnekt-status-wrapper">
                                <img className="konnekt-lady" src={konnektlady} />
                            </div>
                        </div>)
                        :
                        (<div className="user-info-konnekt-wrapper">

                            <div className="current-user-wrapper">
                                {/* Viðmót þegar smellt er á símanúmer */}
                                <div className="current-user-container">
                                    <h2>{this.state.username}</h2>
                                    <div className="user-info">
                                        <h3>Email</h3>
                                        <p>{this.state.email}</p>
                                        <h3>Sími</h3>
                                        <p>{this.state.phone}</p>
                                        <h3>IP</h3>
                                        <p>{this.state.ip}</p>
                                    </div>
                                    <div>{this.state.user_info}</div>
                                </div>
                            </div>


                            <div className="konnekt-status-wrapper">
                                <div className="konnekt-status-container">
                                    <img className="logo" src={logo} />
                                    <div className="konnekt-section">
                                        <p>Senda auðkenningsbeiðni til</p>
                                        <h2>{this.state.username}</h2>
                                        <Request phone={this.state.phone} authenticate={this.authenticate} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>)
    };
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ChatList);
