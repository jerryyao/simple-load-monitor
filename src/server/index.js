const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const os = require('os')
const monitor = require('os-monitor')
const Queue = require('./queue');

const history = new Queue();
console.log(history)

const listen = () => {
  server.listen(3000, () => {
    console.log('Server listening on port 3000...');
  })
};

const close = () => {
    server.close(() => {
      console.log('Server stopped.');
    });
};

// Route to index.html
app.use('/', express.static('public'));

// Start os monitor
monitor.start({
  delay: 1000,
  immediate: true,
});

// Start server
listen();
