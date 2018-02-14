
const path = require("path");
const http = require("http");
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var {generateMessage,generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',
  generateMessage('admin','Welcome to the chat app')
  );
  socket.broadcast.emit('newMessage',
  generateMessage('admin','New user joined')
  );

  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('Achnoledgement from server');
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });
  socket.on('disconnect',() => {
      console.log('User was disconnected');
  });
});

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
