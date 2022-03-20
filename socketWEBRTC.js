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

const server = app.listen(PORT, () => {
  console.log(`WEBRTC app listening on port ${PORT}`)
})

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log('connect')
});

const messages = io.of('/chat-message');

messages.on('connection', (socket) => {
  console.log('A user is Connected');

  // message data
  socket.on('message', (data) => {
    messages.emit('message', `${data.user} said ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const circle = io.of('/my-circle');

circle.on('connection', (socket) => {
  console.log('a user connected');

  // circle data
  socket.on('circledata', (data) => {
    circle.emit('serverdata', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const webrtc = io.of('/my-webrtc');

webrtc.on('connection', (socket) => {

  let sid = socket.id

  console.log('A webrtc connection');

  socket.on('connecto', () => {

    webrtc.emit('ready', {"sid": sid});

    console.log('rtc ready connected');
    
  });

  // video data
  socket.on('sendvideodata', (data) => {
    let peerToSend = "";
    if ('sid' in data) {
        peerToSend = data['sid'];
    }
    data['sid'] = socket.id;
    webrtc.emit('videodata', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});