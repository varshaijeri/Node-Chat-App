var socket = io();
socket.on('connect',function() {
    console.log("connected to server");
    //custom emmiting of event
    socket.emit('createMessage',{
        from:"Varsha",
        text:"Hey bck!!"
    });
});
socket.on('disconnect',function(){
    console.log("Disconnected to the server");
})
//custom event handler
socket.on('newMessage',function(message){
    console.log("New message",message);
});