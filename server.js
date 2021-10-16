let express = require('express');
let http = require('http');
let socket = require('socket.io');
let qs = require('query-string');

let app = express(); // Application that handles routes

let today = new Date();
let time = today.getHours() + ':' + today.getMinutes();

app.use(express.static('public'));

let server = http.createServer(app); // SERVER

let io = socket(server); // WEB SOCKET

io.on('connection', (socket) => {
  console.log(`New connection with Web Socket`);

  // socket.broadcast.emit('newConnection', {
  //   username: 'ChatCord Bot',
  //   msg: 'New User in Chat',
  //   time: time,
  // });

  socket.on('chatMsg', (e) => {
    console.log('Data from client side', e);
    socket.broadcast.emit('msgToChatBox', e);
  });
});

// io.on('disconnect', (e) => {
//   console.log('Someone left chat ', e);
//   e.broadcast.emit('leftChat', {
//     username: 'ChatCord Bot',
//     msg: 'Someone left chat',
//     time: time,
//   });
// });

port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
