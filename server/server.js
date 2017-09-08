const path = require('path');
const publicPath = path.join(__dirname,"../public");
const http = require('http');
const socketIO = require('socket.io')
const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
//to setup socket.io
var server = http.createServer(app);
//server to use socket.io
var io = socketIO(server);

//listens to the events
io.on('connection',(socket)=>{
    console.log("New user connected"); 

    socket.emit('newMessage',{
        from:"varshaijeri2",
        text:"Hey",
        createdAt:new Date().getTime()
    });
    socket.on('createMessage',(message)=>{
        console.log("Create message",message);
    });
    
    socket.on('disconnect',()=>{
        console.log("Disconnected from User");
    });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`)
})