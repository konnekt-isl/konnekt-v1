import React, { Component } from 'react';
import * as firebase from 'firebase';


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

            <div>
                <h1>Chat</h1>
                <p>{this.state.messages.map((message) => <div class={message.chatName === this.state.chatName ? 'right' : 'left'}>{message.chatName + ':' + message.message}</div>)}</p>
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
            </div >
        )
    };
}

export default ChatBox;
