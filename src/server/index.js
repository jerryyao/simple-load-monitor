'use strict';
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const os = require('os')
const monitor = require('os-monitor')
const Queue = require('./queue');

const LOAD_ALERT_THRESHOLD = 1;

const history = new Queue();
let eventBuffer = [];
let lastNotification = null;

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

// Broadcast monitor events
const handleMonitor = (e) => {
  const dataPoint = {
    loadavg: e.loadavg[0], // load average for 1 minute
    timestamp: Date.now(),
  };

  history.enqueue(dataPoint);
  if (isFull(history.toArray(), monitor.minutes(10))) {
    history.dequeue();
  }

  eventBuffer.push(dataPoint);
  if (isFull(eventBuffer, monitor.minutes(2))) {
    const total = eventBuffer.reduce((sum, e) => sum + e.loadavg, 0);
    const avg = total / eventBuffer.length;
    const isAlert = avg > LOAD_ALERT_THRESHOLD;
    const notification = { avg, isAlert, timestamp: dataPoint.timestamp }

    // Emit notification only if it's an alert or recovery
    if (isAlert || (!isAlert && lastNotification && lastNotification.isAlert)) {
      lastNotification = notification;
      io.emit('notification', notification);
    }
    eventBuffer.length = 0; // reset buffer
  }

  io.emit('monitor', dataPoint);
};

const isFull = (array, deltaMaxTime) => {
  const oldest = array[0].timestamp;
  const newest = array[array.length - 1].timestamp;
  return oldest + deltaMaxTime <= newest;
};

// Route to index.html
app.use('/', express.static('public'));

// Start os monitor
monitor.start({
  delay: 1000,
  immediate: true,
});

// Listen to monitor events
monitor.on('monitor', handleMonitor)

// Emit initial state on socket connection with a client
io.on('connection', (client) => {
  client.emit('initialState', {
    history: history.toArray(),
  });
});

// Start server
listen();
