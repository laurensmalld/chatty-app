import React, {Component} from 'react';

class Message extends Component {
  render() {
   const {username, content} = this.props;
    return (
     <div className="Message">
    <span className="username">{username}</span>
    <span className="content">{content}</span>
    </div>
    );
  }
}
export default Message;
