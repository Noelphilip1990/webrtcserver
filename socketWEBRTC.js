const express = require('express');

const app = express();

const socketIO = require('socket.io');

const PORT = process.env.PORT2 || 3200;

const server = app.listen(PORT, () => {
  console.log(`WEBRTC app listening on port ${PORT}`)
})

const io = socketIO(server, {
  cors: {
    origins: ['*']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io WEBRTC</h1>');
});

io.on('connection', (socket) => {

  let sid = socket.id

  console.log('A webrtc connection');

  socket.on('connecto', () => {

    io.emit('ready', {"sid": sid});

    console.log('rtc ready connected');
    
   });

  // video data
  socket.on('sendvideodata', (data) => {
    let peerToSend = "";
    if ('sid' in data) {
        peerToSend = data['sid'];
    }
    data['sid'] = socket.id;
    io.emit('videodata', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});