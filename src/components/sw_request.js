import React, { Component } from 'react';
import md5 from 'md5';

class sw_request extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url_id: 'bls',
            now: null,
        };

        this._handleButtonClick = this._handleButtonClick.bind(this);
    }

    _handleButtonClick = (event) => {
        this.setState({ url_id: md5(new Date()) })
        console.log(this.state.loading)
    }


    render() {
        let url_message = <div> Click to generate url</div>;
        if (this.state.url_id != null) {
            url_message = <div>http://localhost:3000/authenticate/{this.state.url_id} </div>;
        } else {
            url_message = <div> Click to generate url</div>;
        }
        return (
            <div>
                <button onClick={this._handleButtonClick} className="yes-btn">Senda audkenni</button>
                {url_message}
            </div>
        )
    }
}
export default sw_request;