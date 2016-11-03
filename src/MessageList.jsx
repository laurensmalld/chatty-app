import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props){
    super(props);
  }
  render() {
  var messages = this.props.messages.map((msg) => {
    return <Message username={msg.username} content={msg.content} key={msg.id} />}, this);
  return (
  <div id="message-list">
    {messages}
    <div className="message system">
    Anonymous1 changed their name to nomnom.
    </div>
    </div>
  );
  }
}
export default MessageList;
