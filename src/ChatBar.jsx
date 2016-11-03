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
        if (ev.charCode == 13) {
          ev.preventDefault();
          console.log("this is the value: " + this.state.value);
          console.log(this.props.currentUser);
          let username = this.refs.username.value;
          let newMessage = this.refs.newMessage.value;
          this.props.onSubmit(username, newMessage);
        }
    }

  render() {
    const {currentUser, name} = this.props;
    return (
    <footer>
      <input id="username" type="text" name="username" ref="username" placeholder={currentUser} onChange={this.handleSubmit} />
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
