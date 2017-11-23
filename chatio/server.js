const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      usernames = [];

server.listen(process.env.PORT || 3000);

console.log('server running...');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('socket connected ...');

  socket.on('new user', (data, callback) => {
    if(usernames.indexOf(data) != -1){
      callback(false);
    }else{
      callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
  });

  //update usernames
  var updateUsernames = () => {
    io.emit('usernames', usernames);
  }
  //send message
  socket.on('send message', (data) => {
    io.emit('new message', {msg: data, user: socket.username});
  })

  //disconnect socket
  socket.on('disconnect', (data) => {
    if(!socket.username){
      return;
    }
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames();
  });

});
