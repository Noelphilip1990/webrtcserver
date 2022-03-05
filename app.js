const express = require('express');

const app = express();

const socketIO = require('socket.io');

const PORT = process.env.PORT1 || 3000;

const server = app.listen(PORT, () => {
  console.log(`CIRCLE SOCKET listening on port ${PORT}`)
})

const io = socketIO(server, {
  cors: {
    origins: ['*']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // circle data
  socket.on('circledata', (data) => {
    io.emit('serverdata', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});