const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);

console.log('server running...');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('socket connected ...');

  //send message
  socket.on('send message', (data) => {
    io.emit('new message', {msg: data});
  })
})
