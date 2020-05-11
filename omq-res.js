'use strict'
const fs = require('fs')
const zmq = require('zeromq')

// Socket to reply to client requests
const responder = zmq.socket('rep')

// Handle Incoming requests
responder.on('message', data => {

  const request = JSON.parse(data)
  console.log(`Recevied request to get: ${request.path}`);

  // Read the file and reply with contetn
  fs.readFile(request.path, (_, content) => {
    console.log('Sending reponse content');
    responder.send(JSON.stringify({
      content: content.toString(),
      timestamp: Date.now(),
      pid: process.pid
    }))
  })
})

// Listen on TCP port 60401
responder.bind('tcp://127.0.0.1:60401', () => {
  console.log('Listening for zmq requesters ...');
})

// Close the responder when the Node process ends
process.on('SIGINT', () => {
  console.log('Shutting down...');
  responder.close()
})
