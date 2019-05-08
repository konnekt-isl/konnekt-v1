import React, { Component } from 'react';
import * as firebase from 'firebase';
import SVGIcon from "../img/SVGIcon";
import logo from "../img/logo.svg";

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
        };
        this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ phone: this.props.history.location.state.phone, chatName: this.props.history.location.state.chatName })
        const phone = this.props.history.location.state.phone ? this.props.history.location.state.phone : this.state.phone
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
    // Adding to the array of objects
    onSubmit = event => {
        event.preventDefault();
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
    };

    render() {
        const { message, } = this.state;
        const isInvalid = message === '';

        return (

            <div className="chatbox-wrapper">
                <img className="logo" src={logo} />
                <div className="chat-display-wrapper">
                    <div className="chat-bubble-container">
                    {this.state.messages.map((message) => {
                            return (
                                <div class={message.chatName === this.state.chatName ? 'chat-bubble csr' : 'chat-bubble user'}>
                                <p className="msg">{message.url ? <a href={message.url}>Auðkenna með Konnekt</a> : message.chatName + ' : ' + message.message}</p>  
                                </div>)
                        })
                        }    
                        {/* <div className="timestamp-container">
                            <p className={message.isStaff ? 'timestamp t-csr' : 'timestamp t-user'}> {new Date(parseInt(message.messageDate.seconds * 1000)).toUTCString()}</p>
                        </div> */}
                    </div>
           
                </div>
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
                            Senda
                        </button>
                    </form>
                </div>
      
            </div>
        )
    };
}

export default ChatBox;
