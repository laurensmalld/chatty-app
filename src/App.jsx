import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let data = {
       currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    };


class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8080");
    console.log('Connected to server');

    this.socket.onmessage = this.receiveMessage;
  }

  sendMessage(username, content) {


  }

  addMessage(username, content) {
    let count = this.state.messages.length + 1;
    const newMessage = {username: username, content: content, id: count};

    console.log("this is the msg: " + content);

    const allMessages = this.state.messages.concat(newMessage);
    this.setState({messages: allMessages})
  }

  render() {
    console.log("Rendering");

    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser.name}
                  onSubmit={this.addMessage}
                  />
      </div>
    );
  }
}
export default App;


