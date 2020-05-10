'use strict'
//===============Stream=================//
require('fs').createReadStream(process.argv[2])
  .on('data', chunk  => process.stdout.write(chunk))
  .on("error", err => process.stderr.write(`ERROR: ${err.message}\n`))

//===============Synchronous=================//
const fs = require('fs')
const data = fs.readFileSync('helloworld.txt')
process.stdout.write(data.toString()) // Buffer

