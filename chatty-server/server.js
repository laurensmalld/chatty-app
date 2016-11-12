'use strict'

const express = require('express');
const SocketServer = require('ws').Server;
var uuid = require('node-uuid');

// Set the port to 8080
const PORT = 8080;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let counter = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  counter++;
  wss.broadcast(JSON.stringify({type: "counter", count: counter}));

  ws.on('message', handleMessage);

    // console.log("message handled");

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    counter--;
    wss.broadcast(JSON.stringify({type: "counter", count: counter}));
  });
});

function handleMessage(message) {
  // Receive message, parse, add id

  const messageA = JSON.parse(message);

   switch (messageA.type) {
    case "postMessage":
      messageA.type = "incomingMessage"
      messageA.id = uuid.v4();
      wss.broadcast(JSON.stringify(messageA));
      break;

    case "postNotification":
      messageA.type = "incomingNotification"
      wss.broadcast(JSON.stringify(messageA));
      break;
   }
};

wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function(client) {
    client.send(message);
  });
};