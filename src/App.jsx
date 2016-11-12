import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuid from 'node-uuid';

class App extends Component {
        constructor(props) {
        super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      users: 0,
      messages: []
    };
  }
  // connect to server
  componentDidMount () {
    this.socket = new WebSocket("ws://localhost:8080");
    this.socket.onopen = (event) => {
      console.log('Connected to server');
      }

    this.socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

      switch (data.type) {
        case "incomingMessage":
          const message = this.state.messages.concat(data)
          this.setState({messages: message})
          break;

        case "incomingNotification":
          const notification = this.state.messages.concat(data)
          this.setState({messages: notification})
          break;

        case "counter":
        this.setState({users: data.count})
        break;

        default:
          throw new Error("unknown event");
      }
    }
  }

  addMessage (content, username) {
    if (username === "") {
      username = "Anonymous";
    } if (this.state.currentUser.name !== username) {
    let newUser = {
    type: "postNotification",
    content: `${this.state.currentUser.name} changed their name to ${username}`
    };
      this.socket.send(JSON.stringify(newUser));
      this.setState({currentUser: {name: username}});
    }

    const newMessage = {
      type: "postMessage",
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
     document.getElementById("new-message").value = "";
  }


  render() {
    console.log("Rendering");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <h4>{this.state.users} users online</h4>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser.name}
                  onSubmit={this.addMessage.bind(this)} />
      </div>
    )
  }
}
export default App;


