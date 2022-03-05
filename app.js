const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
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

http.listen(process.env.PORT1 || 3000, () => {
  console.log('listening on app.js *: ' + process.env.PORT1);
});