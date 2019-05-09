import React, { Component } from 'react';
import * as firebase from 'firebase';
import send from "../img/send.svg";

//Chat fyrir endanotenda
class ChatBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            read: true,
            phone: '',
            chatName: '',
            message: '',
            messages: [],
            messageDate: '',
            messageList: {},
        };
        this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props.history.location.state.phone, this.props.history.location.state.chatName)
        this.setState({ phone: this.props.history.location.state.phone, chatName: this.props.history.location.state.chatName })
        const phone = this.props.history.location.state.phone ? this.props.history.location.state.phone : this.state.phone
        firebase.firestore().collection('chat').doc(phone).onSnapshot((doc) => {
            this.setState({
                read: doc.data().read,
                messages: doc.data().messages,
            })
        })
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    _handleChange = (event) => {
        this.setState({ messageDate: firebase.firestore.Timestamp.fromDate(new Date()) });
        if (event.target.name === 'message') {
            this.setState({
                message: event.target.value
            })
        }
    }
    // Adding to the array of objects
    onSubmit = event => {
        event.preventDefault();
        const { message, messageDate, chatName } = this.state;
        firebase.firestore().collection('chat').doc(this.state.phone).update({
            read: false,
            messages: firebase.firestore.FieldValue.arrayUnion({
                chatName,
                message,
                messageDate,
            })
        })
        this.setState({ message: '', messageDate: '' })
    };

    // To let the chat scroll down automaticly.
    scrollToBottom = () => {
        const messageList = document.getElementById('messageList') || {}
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    urlify = (text) => {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return `<a href=${url} target="_blank">${url}</a>`;
        })
    }

    renderMessage = (message) => {
        return (message.url
            ?
            <div className="chat-bubble-container">
                <div className={message.isStaff !== true ? 'csr-letter' : 'user-letter'}>{message.chatName.charAt(0)}</div>
                <div className={message.isStaff !== true ? 'csr' : 'user'}>
                    <div className="msg">
                        <a href={message.url}>
                            <button className="konnekt-btn" type="submit">Auðkenna með Konnekt</button>
                        </a>
                    </div>
                </div>

                <div className="timestamp-container">
                    <p className={message.isStaff !== true ? 'timestamp t-csr' : 'timestamp t-user'}> {new Date(parseInt(message.messageDate.seconds * 1000)).toUTCString()}</p>
                </div>
            </div>

            : <div className="chat-bubble-container">
                <div className={message.chatName !== this.state.chatName ? 'csr-letter' : 'user-letter'}>{message.chatName.charAt(0)}</div>
                <div className={message.chatName === this.state.chatName ? 'chat-bubble csr' : 'chat-bubble user'}>
                    <div className="msg">
                        <div dangerouslySetInnerHTML={{ __html: this.urlify(message.message) }} />
                    </div>
                </div>

                <div className="timestamp-container">
                    <p className={message.isStaff !== true ? 'timestamp t-csr' : 'timestamp t-user'}> {new Date(parseInt(message.messageDate.seconds * 1000)).toUTCString()}</p>
                </div>
            </div>
        );
    }

    render() {
        const { message, } = this.state;
        const isInvalid = message === '';

        return (

            <div className="chatbox-wrapper">
                <div className="chat-display-wrapper" id='messageList'>

                    {this.state.messages.map((message) => this.renderMessage(message))}

                </div>
                {this.scrollToBottom()}
                <div className="chat-input-wrapper">
                    <form onSubmit={this.onSubmit}>
                        <input
                            name="message"
                            value={message}
                            onChange={this._handleChange}
                            type="text"
                            placeholder="Skrifaðu hér..."
                        />
                        <button className="btn" disabled={isInvalid} type="submit">
                            <img src={send} alt="send message" />
                        </button>
                    </form>
                </div>
            </div>
        )
    };
}

export default ChatBox;
