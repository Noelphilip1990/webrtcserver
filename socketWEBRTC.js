const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['*']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io WEBRTC</h1>');
});

io.on('connection', (socket) => {

  let sid = socket.id

  console.log('a webrtc connected');



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

http.listen(process.env.PORT2 || 3200, () => {
  console.log('listening socket webrtc on ::' + process.env.PORT);
});