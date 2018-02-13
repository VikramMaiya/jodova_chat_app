
var socket =io();
socket.on('connect', function(){
  console.log('Connected to Server');
  socket.emit('createMessage',{
    from: 'mala',
    text: 'Hey this is mala'
  });
});
socket.on('disconnect', function(){
  console.log('Disconnected from Server');
});
socket.on('newMessage',function(message){
  console.log('new message',message);
});
