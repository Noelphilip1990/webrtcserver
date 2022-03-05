const express = require('express');

const app = express();

const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});


const server = app.listen(PORT, () => {
  console.log(`CIRCLE SOCKET listening on port ${PORT}`)
})

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
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