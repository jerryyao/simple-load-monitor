const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const listen = () => {
  server.listen(3000, () => {
    console.log('Server listening on port 3000...')
  })
};

const close = () => {
    server.close(() => {
      console.log('Server stopped.')
    });
};

listen();