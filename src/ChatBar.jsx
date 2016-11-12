import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(ev) {
       this.setState({value: ev.target.value});
    }

    handleSubmit(ev) {
        if (ev.charCode === 13) {
          ev.preventDefault();
          this.props.onSubmit(this.refs.newMessage.value, this.refs.username.value)
          }
          this.state.value = "";
    }


  render() {
    let currentUser = this.props.currentUser;
    return (
    <footer>
     <input id="username"
          type="text"
          placeholder="Your name here (optional)"
          ref="username"
          value={this.props.curentUser}
          />

      <input id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          ref="newMessage"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit}
          />
    </footer>
    );
  }
}

export default ChatBar;
