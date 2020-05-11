const fs = require("fs");
const zmq = require("zeromq");
const filename = "helloworld";

// Create the publisher endpoint
const publisher = zmq.createSocket('pub');

fs.watch("helloworld.txt", () => {
  publisher.send(
    JSON.stringify({
      type: "changed",
      file: "helloworld",
      timestamp: Date.now(),
    })
  );
});

publisher.bind("tcp://*:60400", (err) => {
  if (err) {
    throw err;
  }
  console.log("Listening forzmq subcribers...");
});
