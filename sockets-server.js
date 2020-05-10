"use strict";
// ===============Binding a Server to a TCP Port=================//
const fs = require("fs");
const net = require("net");

net
  .createServer((connection) => {
    // Reporting
    console.log("Subscriber connected.");
    connection.write(
      JSON.stringify({ type: "watching", title: "helloworld" }) + "\n"
    );

    //Watcher setup
    const watcher = fs.watch("helloworld.txt", () =>
      connection.write(
        JSON.stringify({ type: "changed", timestamp: Date.now() }) + "\n"
      )
    );

    // Cleanup
    connection.on("close", () => {
      console.log("Subscriber disconnected");
      watcher.close();
    });
  })
  .listen(60300, () => console.log("Listening for subscribers..."));
