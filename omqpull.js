'use strict'

const zmq = require('zeromq')

const puller = zmq.socket('pull')

puller.on('message', data => {
  const job = JSON.parse(data.toString())
})
