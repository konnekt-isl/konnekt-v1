// import React, { Component } from 'react';
// import md5 from 'md5';
// import { compose } from 'recompose';
// import * as firebase from 'firebase'
// import { withAuthorization, withEmailVerification } from './Session';



// class Request extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             url_id: null,
//             now: null,
//             loading: false,
//             ssn: '',
//             status: '',
//             timeStamp: '',
//             message: '',
//             userInfo: {},
//             url_message: ''
//         };

//         this._handleButtonClick = this._handleButtonClick.bind(this);
//         this.onListenForStatus = this.onListenForStatus.bind(this);
//     }

//     onListenForStatus = (sessionID) => {
//         firebase.firestore().collection('status').doc(sessionID).set({
//             sessionID,
//             date: { seconds: null }
//         })
//             .then(() => {
//                 firebase.firestore().collection('status').doc(sessionID).onSnapshot((doc) => {
//                     const { ssn, date, status, message } = doc.data();
//                     this.setState({
//                         ssn,
//                         timeStamp: date.seconds,
//                         status,
//                         message: message
//                     })
//                     if (ssn) {
//                         this.getUserInfo(ssn);
//                     }
//                 });
//             });
//     }

//     getUserInfo = (ssn) => {
//         firebase.firestore().collection('end_users').doc(ssn).get()
//             .then((doc) => {
//                 this.setState({
//                     userInfo: doc.data()
//                 })
//             })
//     }

//     _handleButtonClick = (event) => {
//         const md5Date = md5(new Date())
//         this.setState({
//             url_id: md5Date,
//         })
//         this.props.authenticate(md5Date)
//         this.onListenForStatus(md5Date);
//     }


//     render() {
//         let user_info = <div></div>;
//         if (this.state.userInfo != null) {
//             user_info = <div>{this.state.userInfo.name}</div>;
//         } else {
//             user_info = <div></div>;
//         }

//         const phone = this.props.phone;
//         const isInvalid = phone === '';

//         let result = < button onClick={this._handleButtonClick} disabled={isInvalid} className="konnekt-btn" >Auðkenna með Konnekt</button >

//         if (Object.keys(this.state.userInfo).length != 0) {
//             result = <div>{this.state.status === '200' ? (<p>Green</p>) : (<p>Red</p>)}</div>
//         }

//         return (
//             <div>
//                 {/* <RequestBTN /> */}
//             </div>
//         )
//     }
// }

// // class RequestBTN extends Component(props) {
// //     render() {
// //         const isInvalid = props.phone === '';
// //         return (
// //             <div className="konnekt-status-container" >
// //                 <img className="logo" src={logo} />
// //                 <div className="konnekt-section">
// //                     <p>Senda auðkenningsbeiðni til</p>
// //                     <h2>{props.username}</h2>
// //                     <button onClick={this._handleButtonClick} disabled={isInvalid} className="konnekt-btn" >Auðkenna með Konnekt</button>
// //                 </div>
// //             </div>
// //         )
// //     }
// // }











// const condition = authUser => !!authUser;

// export default compose(
//     withEmailVerification,
//     withAuthorization(condition),
// )(Request);