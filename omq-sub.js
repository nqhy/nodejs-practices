"use strict";
const zmq = require("zeromq");

// Create subscriber endpoint
const subscriber = zmq.createSocket("sub");

// Subscribe to all messages
subscriber.subscribe("");

subscriber.on("message", (data) => {
  const message = JSON.parse(data);
  const date = new Date(message.timestamp);
  console.log(`File ${message.file} changed at ${date}`);
});

subscriber.connect("tcp://localhost:60400");
