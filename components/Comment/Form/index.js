import React, { Component } from 'react';

import CommentFormWrapper from './wrapper';

export default class CommentForm extends Component {
    state = {  
        text: "",
    }

    _handleFormOnSubmit = () => this.props.submitComment(this.state.text)

    _handleTextOnChange = ev => this.setState({ text: ev.target.value });

    render() {
        return (
            <CommentFormWrapper>
                <textarea 
                    name="text" 
                    placeholder="Your comment here.." 
                    value={this.state.text}
                    onChange={this._handleTextOnChange}
                />
                <button onClick={this._handleFormOnSubmit}>Send</button>
            </CommentFormWrapper>
        );
    }
}